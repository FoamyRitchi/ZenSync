const professionals = [
    {
        id: 1,
        name: "Dra. Mariana Alves",
        specialty: "Psicóloga",
        image: "image/profissionais/mariana-alves.png",
        categories: ["Psicologia", "Saúde emocional"],
        description: "Atendimento psicológico focado em acolhimento e bem-estar emocional.",
        modalities: ["Online", "Presencial"],
        location: "São Paulo - SP",
        availability: "Hoje",
        availabilityText: "Disponível hoje",
        initials: "MA"
    },
    {
        id: 2,
        name: "Dr. Rafael Mendes",
        specialty: "Psicólogo",
        image: "image/profissionais/rafael-mendes.png",
        categories: ["Psicologia", "Psicoterapia", "Orientação profissional"],
        description: "Psicoterapia e orientação profissional para diferentes momentos da carreira.",
        modalities: ["Online"],
        location: "",
        availability: "Amanhã",
        availabilityText: "Disponível amanhã",
        initials: "RM"
    },
    {
        id: 3,
        name: "Dra. Camila Rocha",
        specialty: "Psicóloga",
        image: "image/profissionais/camila-rocha.png",
        categories: ["Psicologia", "Saúde emocional"],
        description: "Atendimento voltado para saúde emocional e gerenciamento do estresse.",
        modalities: ["Online", "Presencial"],
        location: "São Paulo - SP",
        availability: "Esta semana",
        availabilityText: "Disponível esta semana",
        initials: "CR"
    },
    {
        id: 4,
        name: "Dra. Fernanda Lima",
        specialty: "Psicóloga",
        image: "image/profissionais/fernanda-lima.png",
        categories: ["Psicologia", "Saúde emocional"],
        description: "Atuação em ansiedade, estresse e desenvolvimento do bem-estar.",
        modalities: ["Online"],
        location: "",
        availability: "Esta semana",
        availabilityText: "Disponível esta semana",
        initials: "FL"
    },
    {
        id: 5,
        name: "Dra. Juliana Costa",
        specialty: "Psicóloga",
        image: "image/profissionais/mariana-alves.png",
        categories: ["Psicologia", "Psicoterapia"],
        description: "Atendimento humanizado para acompanhamento emocional individual.",
        modalities: ["Presencial"],
        location: "São Paulo - SP",
        availability: "Amanhã",
        availabilityText: "Disponível amanhã",
        initials: "JC"
    },
    {
        id: 6,
        name: "Dr. Lucas Martins",
        specialty: "Psicólogo",
        image: "image/profissionais/rafael-mendes.png",
        categories: ["Psicologia", "Orientação profissional"],
        description: "Orientação profissional e acompanhamento de desafios relacionados ao trabalho.",
        modalities: ["Online"],
        location: "",
        availability: "Hoje",
        availabilityText: "Disponível hoje",
        initials: "LM"
    }
];

const defaultAppointments = [
    {
        id: "default-1",
        employee: "Ana Souza",
        professional: "Dra. Mariana Alves",
        date: "2026-08-15",
        time: "14:30",
        modality: "Online",
        status: "Agendado"
    },
    {
        id: "default-2",
        employee: "Carlos Oliveira",
        professional: "Dr. Rafael Mendes",
        date: "2026-08-18",
        time: "10:00",
        modality: "Online",
        status: "Agendado"
    },
    {
        id: "default-3",
        employee: "Beatriz Santos",
        professional: "Dra. Camila Rocha",
        date: "2026-08-20",
        time: "15:00",
        modality: "Presencial",
        status: "Agendado"
    }
];

const professionalsGrid = document.getElementById("professionalsGrid");
const emptyState = document.getElementById("emptyState");

const searchProfessional = document.getElementById("searchProfessional");
const specialtyFilter = document.getElementById("specialtyFilter");
const modalityFilter = document.getElementById("modalityFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

const appointmentModal = document.getElementById("appointmentModal");
const closeModal = document.getElementById("closeModal");
const cancelAppointment = document.getElementById("cancelAppointment");

const appointmentForm = document.getElementById("appointmentForm");

const employeeName = document.getElementById("employeeName");
const employeePhone = document.getElementById("employeePhone");
const appointmentModality = document.getElementById("appointmentModality");
const appointmentDate = document.getElementById("appointmentDate");
const appointmentTime = document.getElementById("appointmentTime");
const appointmentObservation = document.getElementById("appointmentObservation");

const selectedProfessional = document.getElementById("selectedProfessional");

const appointmentsList = document.getElementById("appointmentsList");
const scheduledCount = document.getElementById("scheduledCount");

const successToast = document.getElementById("successToast");
const successMessage = document.getElementById("successMessage");
const closeToast = document.getElementById("closeToast");

const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.getElementById("sidebar");

const currentDate = document.getElementById("currentDate");

let selectedProfessionalData = null;

function getAppointments() {
    const savedAppointments = localStorage.getItem("zensync_agendamentos");

    if (!savedAppointments) {
        saveAppointments(defaultAppointments);
        return [...defaultAppointments];
    }

    try {
        const parsedAppointments = JSON.parse(savedAppointments);

        if (!Array.isArray(parsedAppointments)) {
            saveAppointments(defaultAppointments);
            return [...defaultAppointments];
        }

        return parsedAppointments;
    } catch {
        saveAppointments(defaultAppointments);
        return [...defaultAppointments];
    }
}

function saveAppointments(appointments) {
    localStorage.setItem(
        "zensync_agendamentos",
        JSON.stringify(appointments)
    );
}

function formatDate(date) {
    if (!date) {
        return "";
    }

    const parts = date.split("-");

    if (parts.length !== 3) {
        return date;
    }

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatPhone(value) {
    let phone = value.replace(/\D/g, "");

    phone = phone.substring(0, 11);

    if (phone.length <= 2) {
        return phone.length ? `(${phone}` : "";
    }

    if (phone.length <= 7) {
        return `(${phone.substring(0, 2)}) ${phone.substring(2)}`;
    }

    return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`;
}

function validatePhone(phone) {
    const numbers = phone.replace(/\D/g, "");

    return numbers.length === 10 || numbers.length === 11;
}

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();
}

function renderProfessionals(list = professionals) {
    professionalsGrid.innerHTML = "";

    if (!list.length) {
        emptyState.classList.add("show");
        return;
    }

    emptyState.classList.remove("show");

    list.forEach(professional => {
        const card = document.createElement("article");

        card.className = "professional-card";

        const modalityTags = professional.modalities
            .map(modality => {
                const className =
                    modality === "Online"
                        ? "online"
                        : "presencial";

                return `
                    <span class="info-tag ${className}">
                        ${modality}
                    </span>
                `;
            })
            .join("");

        const locationTag = professional.location
            ? `
                <span class="info-tag">
                    ⌖ ${professional.location}
                </span>
            `
            : "";

        card.innerHTML = `
            <div class="professional-top">

                <div class="professional-avatar">
                    <img
                        src="${professional.image}"
                        alt="Foto de ${professional.name}"
                        onerror="this.style.display='none'; this.parentElement.textContent='${professional.initials}'"
                    >
                </div>

                <div class="professional-name-area">

                    <div class="professional-name">
                        ${professional.name}
                    </div>

                    <div class="professional-specialty">
                        ${professional.specialty}
                    </div>

                </div>

            </div>

            <p class="professional-description">
                ${professional.description}
            </p>

            <div class="professional-info">
                ${modalityTags}
                ${locationTag}
            </div>

            <div class="professional-bottom">

                <div class="availability">
                    <span class="availability-dot"></span>
                    ${professional.availabilityText}
                </div>

                <button
                    type="button"
                    class="schedule-button"
                    data-professional-id="${professional.id}"
                >
                    Agendar atendimento
                </button>

            </div>
        `;

        professionalsGrid.appendChild(card);
    });

    const scheduleButtons =
        professionalsGrid.querySelectorAll(".schedule-button");

    scheduleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const professionalId =
                Number(button.dataset.professionalId);

            const professional =
                professionals.find(
                    item => item.id === professionalId
                );

            if (professional) {
                openAppointmentModal(professional);
            }
        });
    });
}

function filterProfessionals() {
    const search =
        searchProfessional.value
            .trim()
            .toLowerCase();

    const specialty =
        specialtyFilter.value;

    const modality =
        modalityFilter.value;

    const availability =
        availabilityFilter.value;

    const filteredProfessionals =
        professionals.filter(professional => {

            const matchesSearch =
                !search ||
                professional.name
                    .toLowerCase()
                    .includes(search) ||
                professional.specialty
                    .toLowerCase()
                    .includes(search) ||
                professional.categories.some(category =>
                    category
                        .toLowerCase()
                        .includes(search)
                );

            const matchesSpecialty =
                !specialty ||
                professional.categories.includes(specialty);

            const matchesModality =
                !modality ||
                professional.modalities.includes(modality);

            const matchesAvailability =
                !availability ||
                professional.availability === availability;

            return (
                matchesSearch &&
                matchesSpecialty &&
                matchesModality &&
                matchesAvailability
            );
        });

    renderProfessionals(filteredProfessionals);
}

function setMinimumDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;

    appointmentDate.min = todayString;
}

function openAppointmentModal(professional) {
    selectedProfessionalData = professional;

    appointmentForm.reset();

    selectedProfessional.innerHTML = `
        <div class="selected-professional-content">

            <div class="selected-professional-avatar">
                <img
                    src="${professional.image}"
                    alt="${professional.name}"
                    onerror="this.style.display='none'; this.parentElement.textContent='${professional.initials}'"
                >
            </div>

            <div>
                <strong>${professional.name}</strong>

                <span>
                    ${professional.specialty}
                </span>

                <small>
                    ${professional.modalities.join(" e ")}
                </small>
            </div>

        </div>
    `;

    setMinimumDate();

    appointmentModal.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
        employeeName.focus();
    }, 100);
}

function closeAppointmentModal() {
    appointmentModal.classList.remove("show");

    document.body.style.overflow = "";

    selectedProfessionalData = null;

    appointmentForm.reset();
}

function updateModalityOptions() {
    if (!selectedProfessionalData) {
        return;
    }

    const availableModalities =
        selectedProfessionalData.modalities;

    Array.from(
        appointmentModality.options
    ).forEach(option => {

        if (!option.value) {
            return;
        }

        option.disabled =
            !availableModalities.includes(
                option.value
            );
    });
}

function renderAppointments() {
    const appointments = getAppointments();

    appointmentsList.innerHTML = "";

    if (!appointments.length) {
        appointmentsList.innerHTML = `
            <div class="no-appointments">
                Nenhum próximo agendamento encontrado.
            </div>
        `;

        scheduledCount.textContent = "42";

        return;
    }

    const sortedAppointments =
        [...appointments].sort((a, b) => {

            const first =
                new Date(`${a.date}T${a.time}`);

            const second =
                new Date(`${b.date}T${b.time}`);

            return first - second;
        });

    sortedAppointments.forEach(appointment => {

        const item =
            document.createElement("div");

        item.className =
            "appointment-item";

        const employeeInitials =
            getInitials(
                appointment.employee
            );

        item.innerHTML = `
            <div class="appointment-employee">

                <div class="appointment-avatar">
                    ${employeeInitials}
                </div>

                <div>
                    <strong>
                        ${appointment.employee}
                    </strong>

                    <span>
                        Funcionário
                    </span>
                </div>

            </div>

            <div class="appointment-professional">

                <strong>
                    ${appointment.professional}
                </strong>

                <span>
                    Profissional credenciado
                </span>

            </div>

            <div class="appointment-date">
                ${formatDate(appointment.date)}
                •
                ${appointment.time}
            </div>

            <div class="appointment-modality">
                ${appointment.modality}
            </div>

            <div class="appointment-status">
                ${appointment.status}
            </div>
        `;

        appointmentsList.appendChild(item);
    });

    const customAppointments =
        appointments.filter(
            appointment =>
                !String(
                    appointment.id
                ).startsWith("default-")
        ).length;

    scheduledCount.textContent =
        42 + customAppointments;
}

function showSuccessMessage(appointment) {
    successMessage.textContent =
        `${appointment.employee} · ` +
        `${appointment.professional} · ` +
        `${formatDate(appointment.date)} às ` +
        `${appointment.time} · ` +
        `${appointment.modality}`;

    successToast.classList.add("show");

    setTimeout(() => {
        successToast.classList.remove("show");
    }, 6000);
}

function updateCurrentDate() {
    const today = new Date();

    const formattedDate =
        today.toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    if (currentDate) {
        currentDate.textContent =
            formattedDate;
    }
}

function clearFilters() {
    searchProfessional.value = "";
    specialtyFilter.value = "";
    modalityFilter.value = "";
    availabilityFilter.value = "";

    renderProfessionals();
}

function handleAppointmentSubmit(event) {
    event.preventDefault();

    const name =
        employeeName.value.trim();

    const phone =
        employeePhone.value.trim();

    const modality =
        appointmentModality.value;

    const date =
        appointmentDate.value;

    const time =
        appointmentTime.value;

    const observation =
        appointmentObservation.value.trim();

    if (!name) {
        alert(
            "Informe o nome do funcionário."
        );

        employeeName.focus();

        return;
    }

    if (!validatePhone(phone)) {
        alert(
            "Informe um telefone válido."
        );

        employeePhone.focus();

        return;
    }

    if (!modality) {
        alert(
            "Selecione a modalidade do atendimento."
        );

        appointmentModality.focus();

        return;
    }

    if (
        selectedProfessionalData &&
        !selectedProfessionalData.modalities.includes(
            modality
        )
    ) {
        alert(
            `${selectedProfessionalData.name} não possui atendimento ${modality.toLowerCase()} disponível.`
        );

        appointmentModality.focus();

        return;
    }

    if (!date) {
        alert(
            "Selecione a data do atendimento."
        );

        appointmentDate.focus();

        return;
    }

    if (!time) {
        alert(
            "Selecione o horário do atendimento."
        );

        appointmentTime.focus();

        return;
    }

    if (!selectedProfessionalData) {
        alert(
            "Selecione um profissional."
        );

        return;
    }

    const appointments =
        getAppointments();

    const alreadyScheduled =
        appointments.some(
            appointment =>
                appointment.professional ===
                    selectedProfessionalData.name &&
                appointment.date === date &&
                appointment.time === time
        );

    if (alreadyScheduled) {
        alert(
            "Esse profissional já possui um atendimento agendado para esse horário. Escolha outro horário."
        );

        appointmentTime.focus();

        return;
    }

    const newAppointment = {
        id: `appointment-${Date.now()}`,
        employee: name,
        phone: phone,
        professional:
            selectedProfessionalData.name,
        date: date,
        time: time,
        modality: modality,
        observation: observation,
        status: "Agendado"
    };

    appointments.push(
        newAppointment
    );

    saveAppointments(
        appointments
    );

    renderAppointments();

    closeAppointmentModal();

    showSuccessMessage(
        newAppointment
    );
}

searchProfessional.addEventListener(
    "input",
    filterProfessionals
);

specialtyFilter.addEventListener(
    "change",
    filterProfessionals
);

modalityFilter.addEventListener(
    "change",
    filterProfessionals
);

availabilityFilter.addEventListener(
    "change",
    filterProfessionals
);

employeePhone.addEventListener(
    "input",
    event => {
        event.target.value =
            formatPhone(
                event.target.value
            );
    }
);

appointmentModality.addEventListener(
    "change",
    () => {

        if (!selectedProfessionalData) {
            return;
        }

        const selected =
            appointmentModality.value;

        if (
            selected &&
            !selectedProfessionalData.modalities.includes(
                selected
            )
        ) {
            alert(
                `${selectedProfessionalData.name} não possui atendimento ${selected.toLowerCase()} disponível.`
            );

            appointmentModality.value = "";
        }
    }
);

appointmentForm.addEventListener(
    "submit",
    handleAppointmentSubmit
);

closeModal.addEventListener(
    "click",
    closeAppointmentModal
);

cancelAppointment.addEventListener(
    "click",
    closeAppointmentModal
);

appointmentModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            appointmentModal
        ) {
            closeAppointmentModal();
        }
    }
);

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            appointmentModal.classList.contains(
                "show"
            )
        ) {
            closeAppointmentModal();
        }
    }
);

closeToast.addEventListener(
    "click",
    () => {
        successToast.classList.remove(
            "show"
        );
    }
);

if (mobileMenu && sidebar) {
    mobileMenu.addEventListener(
        "click",
        () => {
            sidebar.classList.toggle(
                "open"
            );
        }
    );

    document.addEventListener(
        "click",
        event => {

            if (
                window.innerWidth <= 800 &&
                sidebar.classList.contains(
                    "open"
                ) &&
                !sidebar.contains(
                    event.target
                ) &&
                event.target !== mobileMenu
            ) {
                sidebar.classList.remove(
                    "open"
                );
            }
        }
    );
}

document.querySelectorAll(
    ".menu-item, .submenu-item"
).forEach(item => {

    item.addEventListener(
        "click",
        () => {

            if (
                window.innerWidth <= 800 &&
                sidebar
            ) {
                sidebar.classList.remove(
                    "open"
                );
            }
        }
    );
});

updateCurrentDate();

setMinimumDate();

renderProfessionals();

renderAppointments();