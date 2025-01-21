import { ApiResponse, ErrorResponse, TokenData, Agent, AgentResponse, ChatMessage } from './types';

export class MicronClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = 'https://api.micron.sh') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
      const error = data as ErrorResponse;
      throw new Error(error.message || 'An error occurred');
    }

    return data as T;
  }

  /**
   * Get detailed information about a token
   * @param address The token's contract address
   */
  async getToken(address: string): Promise<ApiResponse<TokenData>> {
    return this.request<ApiResponse<TokenData>>(`/v1/token/${address}`);
  }

  /**
   * List all available AI agents
   */
  async listAgents(): Promise<ApiResponse<Agent[]>> {
    return this.request<ApiResponse<Agent[]>>('/v1/agents');
  }

  /**
   * Get details about a specific agent
   * @param id The agent's ID
   */
  async getAgent(id: string): Promise<ApiResponse<Agent>> {
    return this.request<ApiResponse<Agent>>(`/v1/agents/${id}`);
  }

  /**
   * Chat with an AI agent
   * @param agentId The agent's ID
   * @param messages Array of chat messages
   */
  async chat(agentId: string, messages: ChatMessage[]): Promise<ApiResponse<AgentResponse>> {
    return this.request<ApiResponse<AgentResponse>>(`/v1/agents/${agentId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
  }
} 