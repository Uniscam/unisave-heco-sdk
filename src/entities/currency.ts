import JSBI from 'jsbi'

import { ChainId, SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

const CurrencyName = {
  [ChainId.MAINNET]: 'ETH',
  [ChainId.ROPSTEN]: 'ETH',
  [ChainId.RINKEBY]: 'ETH',
  [ChainId.GÖRLI]: 'ETH',
  [ChainId.KOVAN]: 'ETH',
  [ChainId.BSC_MAINNET]: 'BNB',
  [ChainId.BSC_TESTNET]: 'BNB'
}

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  /**
   * The only instance of the base class `Currency`.
   */
  public static readonly ETHER: Currency = new Currency(18, '(Currency)', 'Currency')

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }

  toDisplayableSymbol(chainId: ChainId) {
    if (this !== ETHER) throw new Error('Not currency instance')
    return CurrencyName[chainId]
  }
}

const ETHER = Currency.ETHER
export { ETHER }
