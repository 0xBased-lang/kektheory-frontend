/**
 * BasedAI Explorer API Service
 *
 * Fetches historical event data from the BasedAI blockchain explorer.
 * Uses the Blockscout API to query contract events without running a backend.
 *
 * Events tracked:
 * - OfferMade: When someone creates a new offer
 * - OfferAccepted: When a voucher owner accepts an offer
 * - OfferCancelled: When the offerer cancels their offer
 * - OfferRejected: When a voucher owner rejects an offer
 */

import { keccak256, toUtf8Bytes, AbiCoder } from 'ethers'

// BasedAI Explorer API endpoint
const EXPLORER_API = 'https://explorer.bf1337.org/api'

// KEKTV Offers V2 Contract Address
const KEKTV_OFFERS_ADDRESS = '0x4E8B375C717a136882071923F17Ea08E75DDBcb2'

/**
 * Event signatures (keccak256 hash of event definition)
 * These are used to filter events by type
 */
export const EVENT_SIGNATURES = {
  // OfferMade(uint256 indexed offerId, address indexed offerer, address indexed voucherOwner, uint256 tokenId, uint256 amount, uint256 offerPrice)
  OfferMade: '0x1a8e0fde244a9977c0c15878be5b18858c95d39be4ba3a7c4cf3d7a5d47698f6',

  // OfferAccepted(uint256 indexed offerId, address indexed offerer, address indexed voucherOwner, uint256 tokenId, uint256 amount, uint256 offerPrice)
  OfferAccepted: '0x1f514add757f76c3e97bed00e66989c1e7bdf8b4d2d9c0cc2b122fe33f3d1c43',

  // OfferCancelled(uint256 indexed offerId, address indexed offerer)
  OfferCancelled: '0xef706adf2e8c3e0aed0eddb0db7b8e0d5f34b82e7fe4bb7c7af8c0d48e6e45a3',

  // OfferRejected(uint256 indexed offerId, address indexed voucherOwner)
  OfferRejected: '0x0a2e4bd6e1f84e8c8e24e5097f098f3e7c6a1c8a0e2f9b0e8c7d3a4b5c6e7f8a',
} as const

/**
 * Event types for type safety
 */
export type EventType = keyof typeof EVENT_SIGNATURES

/**
 * Parsed event data structures
 */
export interface BaseEvent {
  blockNumber: number
  timestamp: number
  transactionHash: string
  eventType: EventType
}

export interface OfferMadeEvent extends BaseEvent {
  eventType: 'OfferMade'
  offerId: string
  offerer: string
  voucherOwner: string
  tokenId: number
  amount: string // in wei
  offerPrice: string // in wei (total BASED)
}

export interface OfferAcceptedEvent extends BaseEvent {
  eventType: 'OfferAccepted'
  offerId: string
  offerer: string
  voucherOwner: string
  tokenId: number
  amount: string
  offerPrice: string
}

export interface OfferCancelledEvent extends BaseEvent {
  eventType: 'OfferCancelled'
  offerId: string
  offerer: string
}

export interface OfferRejectedEvent extends BaseEvent {
  eventType: 'OfferRejected'
  offerId: string
  voucherOwner: string
}

export type OfferEvent = OfferMadeEvent | OfferAcceptedEvent | OfferCancelledEvent | OfferRejectedEvent

/**
 * Raw log data from explorer API
 */
interface RawLog {
  address: string
  topics: string[]
  data: string
  blockNumber: string
  timeStamp: string
  transactionHash: string
}

/**
 * Explorer API Service Class
 */
export class ExplorerAPIService {
  private abiCoder = AbiCoder.defaultAbiCoder()

  /**
   * Get all events for KEKTV Offers contract
   * @param fromBlock - Starting block number (default: 0)
   * @param toBlock - Ending block (default: 'latest')
   */
  async getAllEvents(fromBlock: number | string = 0, toBlock: string = 'latest'): Promise<OfferEvent[]> {
    const url = new URL(EXPLORER_API)
    url.searchParams.set('module', 'logs')
    url.searchParams.set('action', 'getLogs')
    url.searchParams.set('fromBlock', fromBlock.toString())
    url.searchParams.set('toBlock', toBlock)
    url.searchParams.set('address', KEKTV_OFFERS_ADDRESS)

    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status === '1' && Array.isArray(data.result)) {
      return data.result.map((log: RawLog) => this.parseLog(log)).filter((e): e is OfferEvent => e !== null)
    }

    return []
  }

  /**
   * Get events by specific type
   * @param eventType - Type of event to fetch
   * @param fromBlock - Starting block
   */
  async getEventsByType(eventType: EventType, fromBlock: number | string = 0): Promise<OfferEvent[]> {
    const url = new URL(EXPLORER_API)
    url.searchParams.set('module', 'logs')
    url.searchParams.set('action', 'getLogs')
    url.searchParams.set('fromBlock', fromBlock.toString())
    url.searchParams.set('toBlock', 'latest')
    url.searchParams.set('address', KEKTV_OFFERS_ADDRESS)
    url.searchParams.set('topic0', EVENT_SIGNATURES[eventType])

    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status === '1' && Array.isArray(data.result)) {
      return data.result.map((log: RawLog) => this.parseLog(log)).filter((e): e is OfferEvent => e !== null)
    }

    return []
  }

  /**
   * Get events for a specific NFT (by tokenId)
   * Note: tokenId is NOT indexed, so we need to fetch all events and filter
   * @param tokenId - NFT token ID
   */
  async getEventsForToken(tokenId: number): Promise<OfferEvent[]> {
    const allEvents = await this.getAllEvents()

    return allEvents.filter((event) => {
      if ('tokenId' in event) {
        return event.tokenId === tokenId
      }
      return false
    })
  }

  /**
   * Get events by user address (offerer or voucherOwner)
   * @param userAddress - User's wallet address
   */
  async getEventsByUser(userAddress: string): Promise<OfferEvent[]> {
    const allEvents = await this.getAllEvents()
    const normalizedAddress = userAddress.toLowerCase()

    return allEvents.filter((event) => {
      if ('offerer' in event && event.offerer.toLowerCase() === normalizedAddress) {
        return true
      }
      if ('voucherOwner' in event && event.voucherOwner.toLowerCase() === normalizedAddress) {
        return true
      }
      return false
    })
  }

  /**
   * Parse raw log into typed event
   */
  private parseLog(log: RawLog): OfferEvent | null {
    const signature = log.topics[0]
    const blockNumber = parseInt(log.blockNumber, 16)
    const timestamp = parseInt(log.timeStamp, 16)
    const transactionHash = log.transactionHash

    const baseEvent = {
      blockNumber,
      timestamp,
      transactionHash,
    }

    try {
      switch (signature) {
        case EVENT_SIGNATURES.OfferMade:
          return this.parseOfferMade(log, baseEvent)

        case EVENT_SIGNATURES.OfferAccepted:
          return this.parseOfferAccepted(log, baseEvent)

        case EVENT_SIGNATURES.OfferCancelled:
          return this.parseOfferCancelled(log, baseEvent)

        case EVENT_SIGNATURES.OfferRejected:
          return this.parseOfferRejected(log, baseEvent)

        default:
          console.warn('Unknown event signature:', signature)
          return null
      }
    } catch (error) {
      console.error('Error parsing log:', error, log)
      return null
    }
  }

  /**
   * Parse OfferMade event
   * event OfferMade(uint256 indexed offerId, address indexed offerer, address indexed voucherOwner, uint256 tokenId, uint256 amount, uint256 offerPrice)
   */
  private parseOfferMade(log: RawLog, baseEvent: Omit<BaseEvent, 'eventType'>): OfferMadeEvent {
    const offerId = BigInt(log.topics[1]).toString()
    const offerer = '0x' + log.topics[2].slice(26) // Remove padding
    const voucherOwner = '0x' + log.topics[3].slice(26)

    // Decode non-indexed parameters from data
    const decoded = this.abiCoder.decode(['uint256', 'uint256', 'uint256'], log.data)

    return {
      ...baseEvent,
      eventType: 'OfferMade',
      offerId,
      offerer,
      voucherOwner,
      tokenId: Number(decoded[0]),
      amount: decoded[1].toString(),
      offerPrice: decoded[2].toString(),
    }
  }

  /**
   * Parse OfferAccepted event
   * event OfferAccepted(uint256 indexed offerId, address indexed offerer, address indexed voucherOwner, uint256 tokenId, uint256 amount, uint256 offerPrice)
   */
  private parseOfferAccepted(log: RawLog, baseEvent: Omit<BaseEvent, 'eventType'>): OfferAcceptedEvent {
    const offerId = BigInt(log.topics[1]).toString()
    const offerer = '0x' + log.topics[2].slice(26)
    const voucherOwner = '0x' + log.topics[3].slice(26)

    const decoded = this.abiCoder.decode(['uint256', 'uint256', 'uint256'], log.data)

    return {
      ...baseEvent,
      eventType: 'OfferAccepted',
      offerId,
      offerer,
      voucherOwner,
      tokenId: Number(decoded[0]),
      amount: decoded[1].toString(),
      offerPrice: decoded[2].toString(),
    }
  }

  /**
   * Parse OfferCancelled event
   * event OfferCancelled(uint256 indexed offerId, address indexed offerer)
   */
  private parseOfferCancelled(log: RawLog, baseEvent: Omit<BaseEvent, 'eventType'>): OfferCancelledEvent {
    const offerId = BigInt(log.topics[1]).toString()
    const offerer = '0x' + log.topics[2].slice(26)

    return {
      ...baseEvent,
      eventType: 'OfferCancelled',
      offerId,
      offerer,
    }
  }

  /**
   * Parse OfferRejected event
   * event OfferRejected(uint256 indexed offerId, address indexed voucherOwner)
   */
  private parseOfferRejected(log: RawLog, baseEvent: Omit<BaseEvent, 'eventType'>): OfferRejectedEvent {
    const offerId = BigInt(log.topics[1]).toString()
    const voucherOwner = '0x' + log.topics[2].slice(26)

    return {
      ...baseEvent,
      eventType: 'OfferRejected',
      offerId,
      voucherOwner,
    }
  }

  /**
   * Get paginated results (handles >1000 logs limit)
   */
  async getAllEventsWithPagination(): Promise<OfferEvent[]> {
    let allEvents: OfferEvent[] = []
    let fromBlock: number | string = 0
    let hasMore = true
    let iterations = 0
    const MAX_ITERATIONS = 100 // Safety limit

    while (hasMore && iterations < MAX_ITERATIONS) {
      const events = await this.getAllEvents(fromBlock)
      allEvents = [...allEvents, ...events]

      if (events.length < 1000) {
        hasMore = false
      } else {
        // Get next page starting from last block + 1
        const maxBlock = Math.max(...events.map((e) => e.blockNumber))
        fromBlock = maxBlock + 1
      }

      iterations++
    }

    // Remove duplicates (same transaction hash + event type)
    const uniqueEvents = allEvents.filter(
      (event, index, self) =>
        index ===
        self.findIndex(
          (e) => e.transactionHash === event.transactionHash && e.eventType === event.eventType
        )
    )

    return uniqueEvents
  }
}

/**
 * Singleton instance
 */
export const explorerAPI = new ExplorerAPIService()
