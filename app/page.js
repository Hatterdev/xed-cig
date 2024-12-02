"use client";
import { useState, useEffect } from "react";
import { SwapWidget, darkTheme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import "@fontsource/ibm-plex-mono/400.css"; // Adiciona a fonte necessária
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

// Customização do tema escuro com detalhes em verde futurista
const futuristicTheme = {
  ...darkTheme,
  accent: "#00FF88", // Verde Neon para elementos destacados
  primary: "#00FF88", // Verde Neon para texto principal
  secondary: "#A9A9A9", // Cinza para texto secundário
  interactive: "#242424", // Fundo interativo
  container: "#1B1B1B", // Fundo do widget
  module: "#101010", // Fundo dos módulos internos
  dialog: "#242424", // Fundo de diálogos (modais)
  outline: "#00FF88", // Bordas
};

export default function CryptoSwap() {
  const [tokenList, setTokenList] = useState([]);
  const [error, setError] = useState(null); // Para tratar erros

  // Função para carregar os dados do arquivo JSON
  const fetchTokenList = async () => {
    try {
      const response = await fetch("/uniswap_data.json");
      const data = await response.json();
      setTokenList(data); // Armazena os dados no estado
      setError(null); // Limpar erro se a requisição for bem-sucedida
    } catch (error) {
      console.error("Erro ao carregar o arquivo JSON:", error);
      setError("Falha ao carregar os dados. Tente novamente mais tarde.");
    }
  };

  // Carrega os dados ao montar o componente
  useEffect(() => {
    fetchTokenList();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#000000", // Fundo da página
        padding: "20px",
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header transparente com blur forte e fio de LED verde abaixo */}
      <div
        style={{
          width: "100%",
          height: "80px",
          position: "fixed",
          top: "0",
          left: "0",
          background: "rgba(0, 0, 0, 0.6)", // Fundo transparente
          backdropFilter: "blur(10px)", // Efeito de blur
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          boxSizing: "border-box",
          zIndex: "1000",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "150px", height: "150px", marginRight: "10px" }}
          />
        </Link>

        <Link
          href="/stake"
          style={{
            color: "#00FF88",
            fontSize: "18px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          STAKE
        </Link>
      </div>

      {/* Fio de LED verde abaixo do Header */}
      <div
        style={{
          width: "100%",
          height: "2px",
          background: "linear-gradient(to right, #00FF88, #00FF88)",
          marginTop: "50px", // Ajuste para ficar logo abaixo do header
        }}
      ></div>

      {/* Uniswap Swap Widget como Hero */}
      <div
        style={{
          marginTop: "100px", // Ajuste para dar espaço ao header fixo
          marginBottom: "30px",
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#1B1B1B",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 10px 20px rgba(0, 255, 136, 0.2)",
        }}
      >
        {/* Passando o tokenList carregado para o widget */}
        <SwapWidget tokenList={tokenList} theme={futuristicTheme} />
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
      )}
    </div>
  );
}
