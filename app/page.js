"use client";
import { useState, useEffect } from 'react';
import { SwapWidget, darkTheme } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import '@fontsource/ibm-plex-mono/400.css'; // Adiciona a fonte necessária
import axios from 'axios';
import Link from 'next/link';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';

=======
>>>>>>> f557f9391ea1d33e297e2865e0d1fc3c512a94ca

// Customização do tema escuro com detalhes em verde futurista
const futuristicTheme = {
  ...darkTheme,
  accent: '#00FF88', // Verde Neon para elementos destacados
  primary: '#00FF88', // Verde Neon para texto principal
  secondary: '#A9A9A9', // Cinza para texto secundário
  interactive: '#242424', // Fundo interativo
  container: '#1B1B1B', // Fundo do widget
  module: '#101010', // Fundo dos módulos internos
  dialog: '#242424', // Fundo de diálogos (modais)
  outline: '#00FF88', // Bordas
};

const CMC_TOKEN_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json';

export default function CryptoSwap() {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [error, setError] = useState(null); // Para tratar erros da API
  const cryptos = [
    'bitcoin',
    'ethereum',
    'binancecoin',
    'cardano',
    'solana',
    'ripple',
    'polkadot',
    'dogecoin',
    'gic-de-contrato', // Adicionando GIC DE CONTRATO
  ];

  // Função para buscar os preços das criptos
  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptos.join(',')}&vs_currencies=usd&include_24hr_change=true`
      );
      setCryptoPrices(response.data);
      setError(null); // Limpar erro se a requisição for bem-sucedida
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      setError('Falha ao buscar os preços. Tente novamente mais tarde.');
    }
  };

  // UseEffect para buscar os preços assim que o componente carregar
  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval); // Limpar o intervalo ao desmontar o componente
  }, [fetchCryptoPrices]); // Adicionando a dependência

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#000000', // Fundo da página
        padding: '20px',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header transparente com blur forte e fio de LED verde abaixo */}
      <div
        style={{
          width: '100%',
          height: '80px',
          position: 'fixed',
          top: '0',
          left: '0',
          background: 'rgba(0, 0, 0, 0.6)', // Fundo transparente
          backdropFilter: 'blur(10px)', // Efeito de blur
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          boxSizing: 'border-box',
          zIndex: '1000',
        }}
      >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
  <img src="/logo.png" alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />

</Link>

<Link href="/stake" style={{ color: '#00FF88', fontSize: '18px', fontWeight: '600', textDecoration: 'none' }}>
  STAKE
</Link>
      </div>

      {/* Fio de LED verde abaixo do Header */}
      <div
        style={{
          width: '100%',
          height: '2px',
          background: 'linear-gradient(to right, #00FF88, #00FF88)',
          marginTop: '80px', // Ajuste para ficar logo abaixo do header
        }}
      ></div>

      {/* Uniswap Swap Widget como Hero */}
      <div
        style={{
          marginTop: '100px', // Ajuste para dar espaço ao header fixo
          marginBottom: '30px',
          width: '100%',
          maxWidth: '800px',
          backgroundColor: '#1B1B1B',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 10px 20px rgba(0, 255, 136, 0.2)',
        }}
      >
        <SwapWidget tokenList={CMC_TOKEN_LIST} theme={futuristicTheme} />
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
      )}

      {/* Exibindo os preços das criptos em 2 linhas de 4 cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 colunas
          gap: '20px',
          padding: '20px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {cryptos.map((crypto) => {
          const data = cryptoPrices[crypto];
          if (!data) return null; // Evita erros se os dados ainda não estiverem carregados

          const price = data.usd;
          const change = data.usd_24h_change;
          return (
            <div
              key={crypto}
              style={{
                backgroundColor: '#2d2d2d',
                borderRadius: '12px',
                padding: '15px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minWidth: '150px', // Card menor
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 20px rgba(0, 255, 136, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  marginBottom: '10px',
                }}
              >
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10"
                  >
                    {crypto === 'gic-de-contrato' ? 'GIC' : crypto.charAt(0).toUpperCase()}
                  </text>
                </svg>
              </div>
              <div style={{ fontSize: '1em', fontWeight: '600', marginBottom: '10px' }}>
                {crypto === 'gic-de-contrato' ? 'GIC DE CONTRATO' : crypto.charAt(0).toUpperCase() + crypto.slice(1)}
              </div>
              <div style={{ fontSize: '1.2em', color: '#00FF88', fontWeight: '700' }}>
                ${price.toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: '0.9em',
                  marginTop: '5px',
                  color: change >= 0 ? '#00FF88' : '#FF4444',
                }}
              >
                {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
