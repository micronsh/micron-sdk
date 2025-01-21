export interface ApiResponse<T = any> {
  data: T;
  timestamp?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: StatusCode;
  timestamp: string;
}

export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

export interface TokenOverview {
  deployer: string;
  mint: string;
  address: string;
  type: string;
}

export interface TokenIndicatorDetails {
  count: number;
  details: string;
}

export interface TokenIndicatorData {
  high: TokenIndicatorDetails;
  moderate: TokenIndicatorDetails;
  low: TokenIndicatorDetails;
  specific: TokenIndicatorDetails;
}

export interface AuditRisk {
  mintDisabled: boolean;
  freezeDisabled: boolean;
  lpBurned: boolean;
  top10Holders: boolean;
}

export interface LiquidityPool {
  address: string;
  amount: number;
  lpPair: string;
}

export interface Owner {
  address: string;
  amount: string;
  percentage: string;
}

export interface TokenData {
  indicatorData: TokenIndicatorData;
  tokenOverview: TokenOverview;
  tokenName: string;
  tokenSymbol: string;
  tokenImg: string;
  address: string;
  score: number;
  deployTime: string;
  marketCap: number;
  externals: string;
  liquidityList: Array<Record<string, LiquidityPool>>;
  ownersList: Owner[];
  auditRisk: AuditRisk;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  capabilities: AgentCapability[];
}

export interface AgentResponse {
  response: string;
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  name?: string;
}

export type AgentCapability = 'token_analysis' | 'market_analysis' | 'risk_assessment'; 