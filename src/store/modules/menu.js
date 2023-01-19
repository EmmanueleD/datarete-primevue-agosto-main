const state = {
  menu: [
    {
        group: "In progress",
        items: [
            {
                label: "Dashboard",
                icon: "layers-half",
                to: "/"
            },
            {
                label: "People analisys",
                icon: "people-fill",
                to: "/"
            }
        ]
    },
    {
        group: "Config",
        items: [
            {
                label: "Define FAQs",
                icon: "question-circle",
                to: "/faqs"
            },
            {
                label: "Campaigns",
                icon: "graph-up",
                items: [
                    {
                        label: "All Campaigns",
                        icon: "dash",
                        to: "/campaigns"
                    }
                ]
            }
        ]
    },
    {
        group: "Users Management",
        items: [
            {
                label: "Users",
                icon: "people-fill",
                items: [
                    {
                        label: "Backoffice",
                        icon: "dash",
                        to: "/backoffice"
                    },
                    {
                        label: "Companies",
                        icon: "dash",
                        to: "/companies"
                    },
                    {
                        label: "Roles",
                        icon: "dash",
                        to: "/roles"
                    },
                    
                    {
                      label: "Users",
                      icon: "dash",
                      to: "/users"
                    },
                    {
                        label: "Backoffice level",
                        icon: "dash",
                        to: "/backofficelevel"
                    },
                ]
            }
        ]
    },
    {
        group: "Talent Analysis",
        items: [
            {
                label: "Talent Analysis",
                icon: "layers-half",
                to: "/talentanalysis"
            }
        ]
    },
    {
        group: "Help center",
        items: [
            {
                label: "Help center",
                icon: "layers-half",
                to: "/helpcenter"
            }
        ]
    }
]
};

const getters = {
  menu: state => state.menu,
};

const actions = {
};

const mutations = {
};

export default {
  state,
  getters,
  actions,
  mutations
};