import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import App from "../App";
import api from "../services";
import MockAdapter from "axios-mock-adapter";
import { LocateCepProvider } from "../providers/CepProvider";

const apiMock = new MockAdapter(api);

describe("Searching Cep", () => {
  it("should be able to retrieve location", async () => {
    apiMock.onGet("88020010").replyOnce(200, {
      bairro: "Centro",
      cep: "88020010",
      cidade: "Florianópolis",
      cidade_info: { area_km2: "675,409", codigo_ibge: "4205407" },
      estado: "SC",
      estado_info: {
        area_km2: "95.737,895",
        codigo_ibge: "42",
        nome: "Santa Catarina",
      },
      logradouro: "Rua Emílio Blum",
    });

    render(
      <LocateCepProvider>
        <App />
      </LocateCepProvider>
    );

    const cepField = screen.getByPlaceholderText("Insira o CEP");

    const buttonElement = screen.getByRole("button");

    fireEvent.change(cepField, {
      target: {
        value: "88020010",
      },
    });

    fireEvent.click(buttonElement);

    const logradouro = await screen.findByDisplayValue("Rua Emílio Blum");
    const numero = await screen.findByText("Toda a extensão");
    const bairro = await screen.findByDisplayValue("Centro");
    const cidade = await screen.findByDisplayValue("Florianópolis");
    const estado = await screen.findByDisplayValue("SC");

    expect(logradouro).toBeTruthy();
    expect(numero).toBeTruthy();
    expect(bairro).toBeTruthy();
    expect(cidade).toBeTruthy();
    expect(estado).toBeTruthy();

    /* const logradouro = screen.getByDisplayValue("Rua Emílio Blum");
    const numero = screen.getByText("Toda a extensão");
    const bairro = screen.getByDisplayValue("Centro");
    const cidade = screen.getByDisplayValue("Florianópolis");
    const estado = screen.getByDisplayValue("SC");

    await waitFor(() => {
      expect(logradouro).toBeTruthy();
      expect(numero).toBeTruthy();
      expect(bairro).toBeTruthy();
      expect(cidade).toBeTruthy();
      expect(estado).toBeTruthy();
    }); */
  });

  /*   it("returns error if cep is not found", async () => {
    apiMock.onGet("88880500").replyOnce(404);

    render(
      <LocateCepProvider>
        <App />
      </LocateCepProvider>
    );

    const cepField = screen.getByPlaceholderText("Insira o CEP");

    const buttonElement = screen.getByRole("button");

    fireEvent.change(cepField, {
      target: {
        value: "88880500",
      },
    });

    fireEvent.click(buttonElement);

    const error = screen.getByText("Ops! CEP não encontrado...");

    await waitFor(() => {
      expect(error).toBeTruthy();
    });
  }); */
});
