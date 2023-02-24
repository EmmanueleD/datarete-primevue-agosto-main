<template>
  <Menubar :model="menuTopbar" />
</template>

<script setup>
import { ref } from "vue"
function onMenuItemClick() {
  this.$emit("menuitem-click")
}
function onMenuToggle(event) {
  this.$emit("menu-toggle", event)
}

const menuTopbar = ref([
  {
    icon: "pi pi-fw  pi-home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw  pi-chart-line ",
        to: "/",
        items: [],
      },
      {
        label: "Statistiche Lead",
        icon: "pi-chart-line",
        to: "/statistiche/",
        items: [],
      },
      {
        label: "Circolari/Procedure",
        icon: "pi-comments",
        to: "/bacheca/circolari/",
        items: [],
      },
      {
        label: "Visitatori Sede",
        icon: "pi-users",
        to: "/plugins/gestione-visitatori",
        items: [],
      },
      {
        label: "Invii Postali",
        icon: "pi-inbox",
        to: "/plugins/gestione-invii",
        items: [],
      },
      {
        label: "Prenotazione Sale",
        icon: "pi-desktop",
        to: "/plugins/prenotazione-sale",
        items: [],
      },
      {
        label: "Drive Documenti",
        icon: "pi-folder-open",
        to: "/plugins/data-drive/",
        items: [],
      },
      {
        label: "Drive Marketing/Social",
        icon: "pi-folder-open",
        to: "/plugins/data-drive-mkt/",
        items: [],
      },
      {
        label: "Organigramma Aziendale",
        icon: "pi-sitemap",
        to: "/organigramma",
        items: [],
      },
    ],
  },
  {
    icon: "pi pi-fw pi-users",
    items: [
      {
        label: "Lead",
        icon: "pi-users",
        to: "/anagrafiche/lead",
        items: [],
      },
      {
        label: "Clienti",
        icon: "pi-users",
        to: "/anagrafiche/clienti",
        items: [],
      },
      {
        label: "Importatore Anag. ",
        icon: "pi-cog",
        to: "/importatore/anagrafiche/",
        items: [],
      },
    ],
  },
  {
    icon: "pi pi-fw pi-list ",
    items: [
      {
        label: "Campagne Marketing",
        icon: "pi-share-alt ",
        to: "/gestione/campagne-marketing/",
        items: [],
      },
    ],
  },
  {
    icon: "pi pi-fw pi-chart-line",
    items: [
      {
        label: "Calendario",
        icon: "pi-calendar",
        to: "/agenda/calendario",
        items: [],
      },
    ],
  },
  {
    icon: "pi pi-fw pi-plus-circle",
    items: [
      {
        label: "Nuovo Preventivo",
        icon: "pi-plus-circle",
        to: "#",
        items: [
          {
            label: "Mutuo",
            icon: "",
            to: "/pratiche/preventivo-mutuo/0/0",
            items: null,
          },
          {
            label: "Prestito Personale",
            icon: "",
            to: "/pratiche/preventivo-prestito/0/0",
            items: null,
          },
          {
            label: "Cessione del quinto",
            icon: "",
            to: "/pratiche/preventivo-cqs/0/0",
            items: null,
          },
          {
            label: "Delega",
            icon: "",
            to: "/pratiche/preventivo-delega/0/0",
            items: null,
          },
        ],
      },
      {
        label: "Nuova pratica",
        icon: "pi-plus-circle",
        to: "#",
        items: [
          {
            label: "Mutuo",
            icon: "",
            to: "/pratiche/nuovo-mutuo",
            items: null,
          },
          {
            label: "Prestito Personale",
            icon: "",
            to: "/pratiche/nuovo-prestito",
            items: null,
          },
          {
            label: "Cessione del quinto",
            icon: "",
            to: "/pratiche/nuova-cqs",
            items: null,
          },
        ],
      },
      {
        label: "Preventivi",
        icon: "pi-file",
        to: "/pratiche/preventivi/",
        items: [],
      },
      {
        label: "Bozze",
        icon: "pi-file",
        to: "/pratiche/bozze",
        items: [],
      },
      {
        label: "Pratiche",
        icon: "pi-file",
        to: "#",
        items: [
          {
            label: "In lavorazione",
            icon: "",
            to: "/pratiche/in-lavorazione",
            items: null,
          },
          {
            label: "Erogate",
            icon: "",
            to: "/pratiche/erogate",
            items: null,
          },
          {
            label: "Annullate",
            icon: "",
            to: "/pratiche/annullate",
            items: null,
          },
        ],
      },
    ],
  },
  {
    icon: " pi pi-fw pi-users",
    items: [
      {
        label: "Anagrafiche",
        icon: "pi-users",
        to: "/anagrafiche/academy/",
        items: [],
      },
      {
        label: "Corsi di Formazione",
        icon: "pi-book",
        to: "/gestione/corsi-di-formazione/",
        items: [],
      },
      {
        label: "Formazione Online",
        icon: "pi-book",
        to: "/gestione/formazione-online/",
        items: [],
      },
    ],
  },
  {
    icon: "pi pi-fw pi-calendar",
    items: [
      {
        label: "Scadenzario Pagamenti",
        icon: "pi-calendar",
        to: "/amministrazione/scadenziario-pagamenti/",
        items: [],
      },
      {
        label: "Note Spesa",
        icon: "pi-euro ",
        to: "/amministrazione/note-spesa/",
        items: [],
      },
      {
        label: "Gestione Fonitori",
        icon: "pi-briefcase",
        to: "/amministrazione/fornitori/",
        items: [],
      },
      {
        label: "Ordini Materiale",
        icon: "pi-shopping-cart",
        to: "/amministrazione/ordini/",
        items: [],
      },
      {
        label: "Inventario",
        icon: "pi-book",
        to: "/plugins/inventario/",
        items: [],
      },
    ],
  },
  {
    icon: "pi pi-fw pi-exclamation-triangle",
    items: [
      {
        label: "Supporto Legale",
        icon: "pi-ticket",
        to: "/supporto/legale",
        items: [],
      },
      {
        label: "Supporto IT",
        icon: "pi-ticket",
        to: "/supporto/it",
        items: [],
      },
      {
        label: "Supporto Pratiche",
        icon: "pi-ticket",
        to: "/supporto/pratiche/",
        items: [],
      },
    ],
  },
  {
    icon: "pi pi-fw pi-cog",
    items: [
      {
        label: "Stati",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Stati Anagrafica",
            icon: "",
            to: "/gestione/stati-anagrafica/",
            items: null,
          },
          {
            label: "Stati Evento",
            icon: "",
            to: "/gestione/stati-evento/",
            items: null,
          },
          {
            label: "Stati Pratica",
            icon: "",
            to: "/gestione/stati-pratica/",
            items: null,
          },
        ],
      },
      {
        label: "Opzioni",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Forme Giuridiche",
            icon: "",
            to: "/gestione/forme-giuriche/",
            items: null,
          },
          {
            label: "Sesso",
            icon: "",
            to: "/gestione/sesso/",
            items: null,
          },
          {
            label: "Stati Civili",
            icon: "",
            to: "/gestione/stati-civili/",
            items: null,
          },
          {
            label: "Stati Giuridici",
            icon: "",
            to: "/gestione/stati-giuridici/",
            items: null,
          },
          {
            label: "Stati Occupazionali",
            icon: "",
            to: "/gestione/stati-occupazionali/",
            items: null,
          },
          {
            label: "Tipi Contatto",
            icon: "",
            to: "/gestione/tipi-contatto/",
            items: null,
          },
          {
            label: "Tipi Documento",
            icon: "",
            to: "/gestione/tipi-documento/",
            items: null,
          },
          {
            label: "Tipi Indirizzo",
            icon: "",
            to: "/gestione/tipi-indirizzo/",
            items: null,
          },
          {
            label: "Argomenti Ticket",
            icon: "",
            to: "/gestione/argomenti-ticket/",
            items: null,
          },
        ],
      },
      {
        label: "Opzioni Geografiche",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Nazioni",
            icon: "",
            to: "/gestione/nazioni/",
            items: null,
          },
          {
            label: "Regioni",
            icon: "",
            to: "/gestione/regioni/",
            items: null,
          },
          {
            label: "Provincie",
            icon: "",
            to: "/gestione/provincie/",
            items: null,
          },
          {
            label: "Città",
            icon: "",
            to: "/gestione/citta/",
            items: null,
          },
        ],
      },
      {
        label: "Gestione Sede",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Tiplogia Sedi",
            icon: "",
            to: "/gestione/tipi-sede/",
            items: null,
          },
          {
            label: "Sedi Azienda",
            icon: "",
            to: "/gestione/sedi-azienda/",
            items: null,
          },
          {
            label: "Sale Riunioni",
            icon: "",
            to: "/plugins/gestione-sale/",
            items: null,
          },
        ],
      },
      {
        label: "Gestione Istituti di Credito",
        icon: "pi-cog",
        to: "/plugins/censimento-istituti-credito",
        items: [],
      },
      {
        label: "Gestione Rete",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Livelli Login",
            icon: "",
            to: "/gestione/livelli-login/",
            items: null,
          },
          {
            label: "Utenti",
            icon: "",
            to: "/gestione/utenti/",
            items: null,
          },
        ],
      },
      {
        label: "Gestione Pratiche",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Tipologia Documenti",
            icon: " ",
            to: "/gestione/tipo-doc-pratiche/",
            items: null,
          },
        ],
      },
      {
        label: "Gestione CRM",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Questionari",
            icon: "",
            to: "/gestione/questionari/",
            items: null,
          },
          {
            label: "Script Chiamata",
            icon: "",
            to: "/gestione/scripts/",
            items: null,
          },
        ],
      },
      {
        label: "LeadCore Plugin",
        icon: "pi-cog",
        to: "#",
        items: [
          {
            label: "Regole Importazione",
            icon: " ",
            to: "/gestione/regole-importazione/",
            items: null,
          },
          {
            label: "Log Importazione",
            icon: " ",
            to: "/gestione/log-importazione/",
            items: null,
          },
        ],
      },
    ],
  },
])
</script>
