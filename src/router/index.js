import { createWebHistory, createRouter } from "vue-router"
import store from "../store"
import AppLayout from "@/views/layout/AppLayout.vue"

const CURRENT_URL = window.location.href

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login/Login.vue"),
      meta: {
        title: "DataRete - Accesso",
      },
    },
    {
      path: "/changepasswordrequest",
      name: "ChangePasswordRequest",
      component: () => import("../views/login/ChangePasswordRequest.vue"),
      meta: {
        title: "DataRete - Richiesta Cambio Password",
      },
    },
    {
      path: "/changepasswordperform/:code",
      name: "ChangePasswordPerform",
      component: () => import("@/views/login/ChangePasswordPerform.vue"),
      meta: {
        title: "DataRete - Realizza Cambio Password",
      },
    },
    {
      path: "/setloginlevel",
      name: "SetLoginLevel",
      component: () => import("../views/login/SetLoginLevel.vue"),
      meta: {
        title: "DataRete - Seleaziona il livello di Accesso",
      },
    },
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/nuova-anagrafica/:idPratica",
          component: () => import("@/views/NuovaAnagrafica.vue"),
        },
        {
          path: "/uploader",
          component: () => import("@/views/Upload.vue"),
        },
        {
          path: "/uploader-contatti",
          component: () => import("@/views/UploadContatti.vue"),
        },
        {
          path: "/testtry1",
          name: "test",
          component: () => import("@/views/TestTry.vue"),
        },
        {
          path: "/testtry2",
          name: "test2",
          component: () => import("@/views/DocumentiBelli.vue"),
        },
        {
          path: "/testtry3",
          name: "test3",
          component: () => import("@/views/Testtry3.vue"),
        },
        {
          path: "",
          name: "Dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: {
            title: "DataRete - Dashboard",
          },
        },
        {
          path: "dashboard-due",
          name: "Dashboard-due",
          component: () => import("@/views/Dashboard_2.vue"),
          meta: {
            title: "DatRete - Dashboard 2",
          },
        },
        {
          path: "statistiche",
          name: "Statistiche",
          component: () => import("@/views/Statistiche.vue"),
          meta: {
            title: "DataRete - Statistiche",
          },
        },
        {
          path: "statistiche-produzione",
          name: "StatisticheProduzione",
          component: () => import("@/views/StatisticheProduzione.vue"),
          meta: {
            title: "DataRete - Statistiche produzione",
          },
        },
        {
          path: "faqs",
          name: "Faqs",
          component: () => import("@/views/Faqs.vue"),
          meta: {
            title: "DataRete - Faqs",
          },
        },
        {
          path: "amministrazione",
          name: "amministrazione",
          children: [
            {
              path: "scadenziario-pagamenti",
              component: () =>
                import("@/views/amministrazione/ScadenziarioPagamenti.vue"),
            },
            {
              path: "note-spesa",
              component: () => import("@/views/gestione/NoteSpesa.vue"),
            },
            {
              path: "ordini",
              component: () => import("@/views/gestione/Ordini.vue"),
            },
            {
              path: "fornitori",
              component: () => import("@/views/gestione/Fornitori.vue"),
            },
          ],
        },
        {
          path: "bacheca",
          name: "bacheca",
          children: [
            {
              path: "circolari",
              name: "circolari",
              component: () => import("@/views/bacheca/Circolari.vue"),
            },
          ],
        },
        {
          path: "anagrafiche",
          name: "anagrafiche",
          children: [
            {
              path: "academy",
              name: "academy",
              component: () => import("@/views/anagrafiche/Accademy.vue"),
            },
            {
              path: "clienti",
              name: "clienti",
              component: () => import("@/views/anagrafiche/Retail.vue"),
              meta: {
                title: "DataRete - Clienti",
              },
            },
            {
              path: "lead",
              name: "lead",
              component: () => import("@/views/anagrafiche/Retail.vue"),
              meta: {
                title: "DataRete - Lead",
              },
            },
            {
              path: "agenda/calendario",
              redirect: {
                name: "calendario",
              },
            },
          ],
        },
        {
          path: "agenda",
          name: "agenda",
          children: [
            {
              path: "calendario",
              name: "calendario",
              component: () => import("@/views/agenda/Calendario.vue"),
              meta: {
                title: "DataRete - Calendario Eventi",
              },
            },
          ],
        },
        {
          path: "pratiche",
          name: "pratiche",
          children: [
            {
              path: "dettaglio-pratica/:idPratica",
              name: "dettaglio-pratica",
              component: () => import("@/views/pratiche/DettaglioPratica.vue"),
            },
            {
              path: "preventivo-mutuo/:idAnagrafica/:idPreventivo",
              name: "preventivo-mutuo",
              component: () => import("@/views/pratiche/PreventivoMutuo.vue"),
            },
            {
              path: "preventivo-prestito/:idAnagrafica/:idPreventivo",
              name: "preventivo-prestito",
              component: () =>
                import("@/views/pratiche/PreventivoPrestito.vue"),
            },
            {
              path: "preventivo-cqs/:idAnagrafica/:idPreventivo",
              name: "preventivo-cqs",
              component: () => import("@/views/pratiche/PreventivoCQS.vue"),
            },
            {
              path: "preventivo-delega/:idAnagrafica/:idPreventivo",
              name: "preventivo-delega",
              component: () => import("@/views/pratiche/PreventivoDelega.vue"),
            },
            {
              path: "nuovo-mutuo",
              name: "nuovo-mutuo",
              component: () => import("@/views/pratiche/NuovoMutuo.vue"),
            },
            {
              path: "nuovo-prestito",
              name: "nuovo-prestito",
              component: () => import("@/views/pratiche/NuovoPrestito.vue"),
            },
            {
              path: "nuova-cqs",
              name: "nuova-cqs",
              component: () => import("@/views/pratiche/NuovaCQS.vue"),
            },
            {
              path: "nuova-delega",
              name: "nuova-delega",
              component: () => import("@/views/pratiche/NuovaDelega.vue"),
            },
            {
              path: "preventivi",
              name: "preventivi",
              component: () => import("@/views/pratiche/Preventivi.vue"),
            },
            {
              path: "bozze",
              name: "bozze",
              component: () => import("@/views/pratiche/Bozze.vue"),
            },
            {
              path: "in-lavorazione",
              name: "in-lavorazione",
              component: () => import("@/views/pratiche/InLavorazione.vue"),
            },
            {
              path: "erogate",
              name: "erogate",
              component: () => import("@/views/pratiche/Erogate.vue"),
            },
            {
              path: "annullate",
              name: "annullate",
              component: () => import("@/views/pratiche/Annullate.vue"),
            },
          ],
        },
        {
          path: "gestione",
          name: "gestione",
          children: [
            {
              path: "notizie",
              component: () => import("@/views/gestione/Notizie.vue"),
            },
            {
              path: "stati-compensi",
              component: () => import("@/views/gestione/StatiCompensi.vue"),
            },
            {
              path: "log-importazione",
              component: () => import("@/views/gestione/LogImportazione.vue"),
            },
            {
              path: "elenco-preventivi-salvati",
              component: () =>
                import("@/views/gestione/ElencoPreventiviSalvati.vue"),
            },
            {
              path: "regole-importazione",
              component: () =>
                import("@/views/gestione/RegoleDiImportazione.vue"),
            },
            {
              path: "campagne-marketing",
              component: () => import("@/views/gestione/CampagneMarketing.vue"),
            },
            {
              path: "modelli-mail",
              component: () => import("@/views/gestione/ModelliMail.vue"),
            },
            {
              path: "modelli-sms",
              component: () => import("@/views/gestione/ModelliSMS.vue"),
            },
            {
              path: "modelli-wa",
              component: () => import("@/views/gestione/ModelliWA.vue"),
            },
            {
              path: "stati-pratica",
              component: () => import("@/views/gestione/StatiPratica.vue"),
            },
            {
              path: "corsi-di-formazione",
              component: () => import("@/views/gestione/CorsiDiFormazione.vue"),
            },
            {
              path: "dettaglio-corso/:idCorso",
              component: () =>
                import("@/views/gestione/DettaglioCorsoDiFormazione.vue"),
            },
            {
              path: "formazione-online",
              component: () => import("@/views/gestione/FormazioneOnline.vue"),
            },
            {
              path: "argomenti-ticket",
              component: () => import("@/views/gestione/ArgomentiTicket.vue"),
            },
            {
              path: "utenti",
              component: () => import("@/views/gestione/Users.vue"),
            },
            {
              path: "scripts",
              component: () => import("@/views/gestione/Scripts.vue"),
            },
            {
              path: "questionari",
              component: () => import("@/views/gestione/Questionari.vue"),
            },
            {
              path: "stati-anagrafica",
              name: "stati-anagrafica",
              component: () => import("@/views/gestione/StatiAnagrafica.vue"),
            },
            {
              path: "stati-evento",
              name: "stati-evento",
              component: () => import("@/views/gestione/StatiEvento.vue"),
            },
            {
              path: "forme-giuriche",
              name: "forme-giuriche",
              component: () => import("@/views/gestione/FormeGiuridiche.vue"),
            },
            {
              path: "sesso",
              name: "sesso",
              component: () => import("@/views/gestione/Sesso.vue"),
            },
            {
              path: "stati-anagrafica",
              name: "stati-anagrafica",
              component: () => import("@/views/gestione/StatiAnagrafica.vue"),
            },
            {
              path: "stati-civili",
              name: "stati-civili",
              component: () => import("@/views/gestione/StatiCivili.vue"),
            },
            {
              path: "stati-giuridici",
              name: "stati-giuridici",
              component: () => import("@/views/gestione/StatiGiuridici.vue"),
            },
            {
              path: "stati-occupazionali",
              name: "stati-occupazionali",
              component: () =>
                import("@/views/gestione/StatiOccupazionali.vue"),
            },
            {
              path: "tipi-contatto",
              name: "tipi-contatto",
              component: () => import("@/views/gestione/TipiContatto.vue"),
            },
            {
              path: "tipi-documento",
              name: "tipi-documento",
              component: () => import("@/views/gestione/TipiDocumento.vue"),
            },
            {
              path: "tipi-indirizzo",
              name: "tipi-indirizzo",
              component: () => import("@/views/gestione/TipiIndirizzo.vue"),
            },
            {
              path: "nazioni",
              name: "nazioni",
              component: () => import("@/views/gestione/Nazioni.vue"),
            },
            {
              path: "regioni",
              name: "regioni",
              component: () => import("@/views/gestione/Regioni.vue"),
            },
            {
              path: "provincie",
              name: "provincie",
              component: () => import("@/views/gestione/Provincie.vue"),
            },
            {
              path: "citta",
              name: "citta",
              component: () => import("@/views/gestione/Citta.vue"),
            },
            {
              path: "tipi-sede",
              component: () => import("@/views/gestione/TipiSede.vue"),
            },
            {
              path: "sedi-azienda",
              component: () => import("@/views/gestione/SediAzienda.vue"),
            },
            {
              path: "livelli-login",
              component: () => import("@/views/gestione/LivelliLogin.vue"),
            },
            {
              path: "categorie-learning",
              component: () => import("@/views/gestione/CategorieLearning.vue"),
            },
            {
              path: "tipo-doc-pratiche",
              component: () =>
                import("@/views/gestione/TipiDocumentoPratiche.vue"),
            },
          ],
        },
        {
          path: "supporto",
          name: "supporto",
          children: [
            {
              path: "legale",
              name: "legale",
              component: () => import("@/views/supporto/Legale.vue"),
            },
            {
              path: "it",
              name: "it",
              component: () => import("@/views/supporto/IT.vue"),
            },
            {
              path: "pratiche",
              name: "supporto-pratiche",
              component: () => import("@/views/supporto/Pratiche.vue"),
            },
          ],
        },
        {
          path: "plugins",
          name: "plugins",
          children: [
            {
              path: "censimento-istituti-credito",
              component: () =>
                import("@/views/plugins/CensimentoIstitutiDiCredito.vue"),
            },
            {
              path: "gestione-invii",
              component: () => import("@/views/plugins/GestioneInvii.vue"),
            },
            {
              path: "gestione-visitatori",
              component: () => import("@/views/plugins/GestioneVisitatori.vue"),
            },
            {
              path: "prenotazione-sale",
              component: () => import("@/views/plugins/PrenotazioneSale.vue"),
            },
            {
              path: "gestione-sale",
              component: () =>
                import("@/views/plugins/GestioneSaleRiunioni.vue"),
            },
            {
              path: "data-drive",
              component: () => import("@/views/plugins/DataDrive.vue"),
            },
            {
              path: "data-drive-mkt",
              component: () => import("@/views/plugins/DataDriveMkt.vue"),
            },
            {
              path: "inventario",
              component: () => import("@/views/plugins/Inventario.vue"),
            },
          ],
        },
        {
          path: "importatore",
          name: "importatore",
          children: [
            {
              path: "anagrafiche",
              component: () => import("@/views/importatore/Anagrafiche.vue"),
            },
            {
              path: "storico",
              component: () => import("@/views/importatore/Storico.vue"),
            },
          ],
        },
        {
          path: "/crm/:idAnagrafica",
          name: "crm",
          component: () => import("@/views/CRM/CrmLayout.vue"),
        },
        {
          path: "organigramma",
          name: "organigramma",
          component: () => import("@/views/Organigramma.vue"),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log("Authenticated:" + store.getters.isAuthenticated)

  if (
    to.name !== "Login" &&
    to.name !== "ChangePasswordRequest" &&
    to.name !== "ChangePasswordPerform" &&
    !store.getters.isAuthenticated
  ) {
    next({ name: "Login" })
  } else {
    next()
  }
})

// const DEFAULT_TITLE = 'DataRete';
// router.afterEach((to) => {
//     Vue.nextTick(() => {
//         document.title = to.meta.title || DEFAULT_TITLE;
//     });
// });

export default router
