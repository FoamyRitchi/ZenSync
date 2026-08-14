document.addEventListener("DOMContentLoaded", () => {

    const filterButton = document.getElementById("filterButton");
    const filterPanel = document.getElementById("filterPanel");

    const applyFilters = document.getElementById("applyFilters");
    const clearFilters = document.getElementById("clearFilters");

    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    const departmentFilter = document.getElementById("departmentFilter");
    const statusFilter = document.getElementById("statusFilter");

    const dateLabel = document.getElementById("dateLabel");

    const notificationBtn = document.getElementById("notificationBtn");

    const exportBtn = document.getElementById("exportBtn");

    const allAlerts = document.getElementById("allAlerts");

    const modal = document.getElementById("modal");
    const modalClose = document.getElementById("modalClose");
    const modalConfirm = document.getElementById("modalConfirm");

    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");

    const toast = document.getElementById("toast");

    const logoutBtn = document.getElementById("logoutBtn");
    const logoutModal = document.getElementById("logoutModal");

    const cancelLogout = document.getElementById("cancelLogout");
    const confirmLogout = document.getElementById("confirmLogout");


    if (filterButton && filterPanel) {

        filterButton.addEventListener("click", (event) => {

            event.stopPropagation();

            filterPanel.classList.toggle("show");

        });

        document.addEventListener("click", (event) => {

            if (
                !filterPanel.contains(event.target) &&
                !filterButton.contains(event.target)
            ) {

                filterPanel.classList.remove("show");

            }

        });

    }


    if (applyFilters) {

        applyFilters.addEventListener("click", () => {

            if (!startDate || !endDate) {
                return;
            }

            if (!startDate.value || !endDate.value) {

                showToast("Selecione as duas datas.");

                return;

            }

            if (startDate.value > endDate.value) {

                showToast(
                    "A data inicial não pode ser maior que a data final."
                );

                return;

            }

            const inicio = formatDate(startDate.value);
            const fim = formatDate(endDate.value);

            if (dateLabel) {

                dateLabel.textContent =
                    `${inicio} - ${fim}`;

            }

            if (filterPanel) {

                filterPanel.classList.remove("show");

            }

            showToast("Filtros aplicados com sucesso.");

        });

    }


    if (clearFilters) {

        clearFilters.addEventListener("click", () => {

            if (startDate) {

                startDate.value = "2024-05-01";

            }

            if (endDate) {

                endDate.value = "2024-05-31";

            }

            if (departmentFilter) {

                departmentFilter.value = "todos";

            }

            if (statusFilter) {

                statusFilter.value = "todos";

            }

            if (dateLabel) {

                dateLabel.textContent =
                    "01/05/2024 - 31/05/2024";

            }

            if (filterPanel) {

                filterPanel.classList.remove("show");

            }

            showToast("Filtros limpos.");

        });

    }


    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            openModal(
                "Notificações",
                "Você possui 3 novos alertas sobre o bem-estar da equipe."
            );

        });

    }


    const metricCards =
        document.querySelectorAll(".metric-card.clickable");

    metricCards.forEach((card) => {

        card.addEventListener("click", () => {

            const titleElement =
                card.querySelector("h3");

            const title =
                titleElement
                    ? titleElement.textContent.trim()
                    : "Indicador";

            openModal(
                title,
                "Este indicador apresenta informações consolidadas e anônimas da equipe."
            );

        });

    });


    const alertCards =
        document.querySelectorAll(".alert-card");

    alertCards.forEach((alert) => {

        alert.addEventListener("click", () => {

            const titleElement =
                alert.querySelector("strong");

            const textElement =
                alert.querySelector("small");

            const title =
                titleElement
                    ? titleElement.textContent.trim()
                    : "Alerta";

            const text =
                textElement
                    ? textElement.textContent.trim()
                    : "Informações sobre este alerta.";

            openModal(title, text);

        });

    });


    if (allAlerts) {

        allAlerts.addEventListener("click", () => {

            openModal(
                "Alertas e insights",
                "Aqui serão exibidos todos os alertas e insights disponíveis para a empresa."
            );

        });

    }


    if (exportBtn) {

        exportBtn.addEventListener("click", () => {

            showToast(
                "Relatório preparado para exportação."
            );

        });

    }


    if (logoutBtn) {

        logoutBtn.addEventListener("click", (event) => {

            event.preventDefault();

            if (logoutModal) {

                logoutModal.classList.add("show");

            }

        });

    }


    if (cancelLogout) {

        cancelLogout.addEventListener("click", () => {

            if (logoutModal) {

                logoutModal.classList.remove("show");

            }

        });

    }


    if (confirmLogout) {

        confirmLogout.addEventListener("click", () => {

            window.location.href = "login.html";

        });

    }


    if (logoutModal) {

        logoutModal.addEventListener("click", (event) => {

            if (event.target === logoutModal) {

                logoutModal.classList.remove("show");

            }

        });

    }


    if (modalClose) {

        modalClose.addEventListener("click", () => {

            closeModal();

        });

    }


    if (modalConfirm) {

        modalConfirm.addEventListener("click", () => {

            closeModal();

        });

    }


    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                closeModal();

            }

        });

    }


    function openModal(title, text) {

        if (!modal) {
            return;
        }

        if (modalTitle) {

            modalTitle.textContent = title;

        }

        if (modalText) {

            modalText.textContent = text;

        }

        modal.classList.add("show");

    }


    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

    }


    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }


    function formatDate(date) {

        if (!date) {
            return "";
        }

        const partes = date.split("-");

        if (partes.length !== 3) {
            return date;
        }

        const year = partes[0];
        const month = partes[1];
        const day = partes[2];

        return `${day}/${month}/${year}`;

    }


    const topHome =
        document.querySelector('.top-nav a[href="AreaEmp.html"]');

    if (topHome) {

        topHome.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href = "AreaEmp.html";

        });

    }


    const sideHome =
        document.querySelector('.side-nav a[href="AreaEmp.html"]');

    if (sideHome) {

        sideHome.addEventListener("click", (event) => {

            event.preventDefault();

            window.location.href = "AreaEmp.html";

        });

    }


    const sideLinks =
        document.querySelectorAll(".side-nav .nav-item");

    sideLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destination =
                link.getAttribute("href");

            if (
                destination &&
                destination !== "#" &&
                destination !== "javascript:void(0)"
            ) {

                event.preventDefault();

                window.location.href = destination;

            }

        });

    });


    const topLinks =
        document.querySelectorAll(".top-nav a");

    topLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destination =
                link.getAttribute("href");

            if (
                destination &&
                destination !== "#" &&
                destination !== "javascript:void(0)"
            ) {

                event.preventDefault();

                window.location.href = destination;

            }

        });

    });


    const reportButton =
        document.querySelector(".BtnRelatorio");

    if (reportButton) {

        reportButton.addEventListener("click", (event) => {

            const destination =
                reportButton.getAttribute("href");

            if (destination) {

                event.preventDefault();

                window.location.href = destination;

            }

        });

    }

});