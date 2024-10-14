import {
  renderBrogramadores,
  renderColapintos,
  renderLosOgata,
} from "./script-2.js";
import {
  renderLosFachas,
  renderRompecircuitos,
} from "./script-3.js";
import {
  renderMonteCarlo,
} from "./script-4.js";

/** Petición HTTP de la data al maestro. */
async function fetchData() {
  try {
    const response = await fetch("/data");
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error("Error al buscar la data:", error);
  }
}

const ALL_TERMINALS = [
  "TeoriaDelDescontrol",
  "ClubTA",
  "TeamISI",
  "Colapintos",
  "Brogramadores",
  "LosOgata",
  "MonteCarlo",
  "Rompecircuitos",
  "LosFachas",
];

/** Renderizar la información disponible de cada equipo en su menu del dashboard. */
function renderData(data) {
  if (data.terminales_conectados) {
    for (const t of ALL_TERMINALS) {
      // Indicar si está desconectado o no
      const container = document.getElementById(t);
      if (data.terminales_conectados.includes(t)) {
        container.parentElement.classList.remove("disconnected");
        container.parentElement.classList.add("connected");
      } else {
        container.parentElement.classList.add("disconnected");
      }
    }
  }
  if (data.TeoriaDelDescontrol) {
    renderTeoriaDelDescontrol(data.TeoriaDelDescontrol);
  }
  if (data.ClubTA) {
    renderClubTA(data.ClubTA);
  }
  if (data.TeamISI) {
    renderTeamISI(data.TeamISI);
  }
  if (data.Colapintos) {
    renderColapintos(data.Colapintos);
  }
  if (data.Brogramadores) {
    renderBrogramadores(data.Brogramadores);
  }
  if (data.LosOgata) {
    renderLosOgata(data.LosOgata);
  }
  if (data.MonteCarlo) {
    renderMonteCarlo(data.MonteCarlo);
  }
  if (data.Rompecircuitos) {
    renderRompecircuitos(data.Rompecircuitos);
  }
  if (data.LosFachas) {
    renderLosFachas(data.LosFachas);
  }
}

function renderTeoriaDelDescontrol(data) {
  const container = document.getElementById("TeoriaDelDescontrol");
  // Personalizar por el equipo correspondiente
  container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function renderClubTA(data) {
  const container = document.getElementById("ClubTA");
  // Personalizar por el equipo correspondiente
  container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function renderTeamISI(data) {
  const container = document.getElementById("TeamISI");
  container.innerHTML =
  `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; padding: 20px; background-color: #f4f4f9;">
        <div class="tableContainer" style="width: 60%; margin: 0 auto;">
            <table style="width: 100%; border-collapse: collapse; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);">
                <thead>
                    <tr>
                        <th style="background-color: #6f42c1; color: white; padding: 12px; font-size: 1.3em; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid black; border-right: 1px solid black;">Relay</th>
                        <th style="background-color: #6f42c1; color: white; padding: 12px; font-size: 1.3em; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid black; border-right: 1px solid black;">Ángulo brazo</th>
                        <th style="background-color: #6f42c1; color: white; padding: 12px; font-size: 1.3em; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid black; border-right: 1px solid black;">Posición panel eje X</th>
                        <th style="background-color: #6f42c1; color: white; padding: 12px; font-size: 1.3em; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid black;">Posición panel eje Y</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="background-color: #fafafa; color: #333; padding: 12px; text-align: center; font-size: 1.1em; border-bottom: 1px solid black; border-right: 1px solid black;">${data.relay}</td>
                        <td style="background-color: #fafafa; color: #333; padding: 12px; text-align: center; font-size: 1.1em; border-bottom: 1px solid black; border-right: 1px solid black;">${data.angulo_brazo}</td>
                        <td style="background-color: #fafafa; color: #333; padding: 12px; text-align: center; font-size: 1.1em; border-bottom: 1px solid black; border-right: 1px solid black;">${data.pos_panel_x}</td>
                        <td style="background-color: #fafafa; color: #333; padding: 12px; text-align: center; font-size: 1.1em; border-bottom: 1px solid black;">${data.pos_panel_y}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  `;
}

const FETCH_INTERVAL_MS = 500;

// Buscar data nueva cada cierto intervalo
setInterval(fetchData, FETCH_INTERVAL_MS);
