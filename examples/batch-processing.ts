import MicronClient from '../src';
import { TokenData, ApiResponse } from '../src/types';

async function main() {
  const client = new MicronClient();

  try {
    // Process tokens in batches
    const addresses = [
      '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      // Add more addresses...
    ];

    // Process in batches of 2
    const batchSize = 2;
    const results: ApiResponse<TokenData>[] = [];

    for (let i = 0; i < addresses.length; i += batchSize) {
      const batch = addresses.slice(i, i + batchSize);
      const promises = batch.map(address => client.getToken(address));
      
      console.log(`Processing batch ${i / batchSize + 1}...`);
      const batchResults = await Promise.all(promises);
      results.push(...batchResults);
    }

    // Analyze results
    const highRiskTokens = results.filter(r => r.data.score < 50);
    console.log('High Risk Tokens:', highRiskTokens.map(r => r.data.tokenName));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 