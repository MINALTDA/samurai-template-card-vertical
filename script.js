function decodeUserData() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const encodedData = urlParams.get("data")

    if (!encodedData) {
      console.log("Modo preview - usando dados de exemplo")
      return getDefaultData()
    }

    const jsonString = atob(encodedData.replace(/-/g, "+").replace(/_/g, "/"))
    const userData = JSON.parse(jsonString)
    console.log("Dados decodificados:", userData)
    return userData
  } catch (error) {
    console.error("Error decodificando dados:", error)
    return getDefaultData()
  }
}

function getDefaultData() {
  return {
    nome: "João Silva",
    cargo: "Desenvolvedor Full Stack",
    descricao:
      "Especialista em desenvolvimento de aplicações web e mobile com mais de 5 anos de experiência criando soluções inovadoras.",
    foto: "https://via.placeholder.com/200/635BFF/FFFFFF?text=JS",
    habilidades: ["React", "Flutter", "Node.js", "Firebase", "Python", "AWS"],
    score: "4.8",
    projetos: "15",
  }
}

function renderUserData(userData) {
  // Atualizar foto de perfil
  const profilePhoto = document.getElementById("profilePhoto")
  profilePhoto.src = userData.foto || "https://via.placeholder.com/200/635BFF/FFFFFF?text=?"
  profilePhoto.alt = `Foto de ${userData.nome}`

  // Atualizar nome e cargo
  document.getElementById("profileName").textContent = userData.nome || "Nome não disponível"
  document.getElementById("profileTitle").textContent = userData.cargo || "Cargo não disponível"

  // Atualizar descrição
  document.getElementById("profileDescription").textContent = userData.descricao || "Descrição não disponível"

  // Renderizar habilidades
  const skillsGrid = document.getElementById("skillsGrid")
  skillsGrid.innerHTML = ""

  if (userData.habilidades && Array.isArray(userData.habilidades)) {
    userData.habilidades.forEach((skill, index) => {
      const skillTag = document.createElement("span")
      skillTag.className = "skill-tag"
      skillTag.textContent = skill
      skillTag.style.animationDelay = `${index * 0.1}s`
      skillsGrid.appendChild(skillTag)
    })
  }

  // Atualizar métricas
  const score = Number.parseFloat(userData.score) || 0
  const stars = "★".repeat(Math.floor(score)) + (score % 1 >= 0.5 ? "☆" : "")
  document.getElementById("profileScore").textContent = `${stars} ${score.toFixed(1)}`

  document.getElementById("profileProjects").textContent = userData.projetos || "0"
}

function addLoadingAnimation() {
  const elements = ["profileName", "profileTitle", "profileDescription"]
  elements.forEach((id) => {
    document.getElementById(id).classList.add("loading")
  })
}

function removeLoadingAnimation() {
  const elements = ["profileName", "profileTitle", "profileDescription"]
  elements.forEach((id) => {
    document.getElementById(id).classList.remove("loading")
  })
}

function handleImageError() {
  const profilePhoto = document.getElementById("profilePhoto")
  profilePhoto.src = "https://via.placeholder.com/200/635BFF/FFFFFF?text=?"
}

function initializeCard() {
  // Adicionar animação de loading
  addLoadingAnimation()

  // Simular delay de carregamento para melhor UX
  setTimeout(() => {
    try {
      const userData = decodeUserData()
      renderUserData(userData)
      removeLoadingAnimation()

      // Adicionar handler para erro de imagem
      const profilePhoto = document.getElementById("profilePhoto")
      profilePhoto.onerror = handleImageError

      console.log("Cartão inicializado com sucesso")
    } catch (error) {
      console.error("Erro ao inicializar cartão:", error)
      removeLoadingAnimation()

      // Mostrar dados padrão em caso de erro
      const defaultData = getDefaultData()
      renderUserData(defaultData)
    }
  }, 500)
}

// Adicionar animações de hover dinâmicas
function addHoverEffects() {
  const profileCard = document.getElementById("profileCard")

  profileCard.addEventListener("mouseenter", () => {
    profileCard.style.transform = "translateY(-5px)"
    profileCard.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)"
  })

  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "translateY(0)"
    profileCard.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)"
  })
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeCard()
  addHoverEffects()
})

// Adicionar suporte para redimensionamento da janela
window.addEventListener("resize", () => {
  // Reajustar layout se necessário
  console.log("Janela redimensionada")
})

// Função para debug - pode ser chamada no console
window.debugCard = () => {
  const userData = decodeUserData()
  console.log("Dados atuais:", userData)
  return userData
}
