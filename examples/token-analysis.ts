import MicronClient from '../src';

async function main() {
  const client = new MicronClient();

  try {
    // Analyze multiple tokens
    const tokens = [
      '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',  // Example token 1
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'   // Example token 2
    ];

    for (const address of tokens) {
      const tokenInfo = await client.getToken(address);
      console.log(`\nAnalyzing token: ${address}`);
      console.log(`Name: ${tokenInfo.data.tokenName}`);
      console.log(`Score: ${tokenInfo.data.score}`);
      console.log(`Market Cap: $${tokenInfo.data.marketCap}`);
      console.log('Risk Indicators:', tokenInfo.data.indicatorData);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 