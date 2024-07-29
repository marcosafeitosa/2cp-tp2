const contentArray = [
    "I. Introdução. (Balão Verde)",
    "Seja bem-vindo ao Treinamento Preparatório II.",
    "O Tp2 tem como finalidade garantir que você conseguirá aplicar o Treinamento Básico II (T2) corretamente",
    "e os treinados conseguirão tirar máximo proveito do treino.",
    "Ao final do treinamento você receberá a sigla Tp2.",
    "Dúvidas?",
    "II. Treinamento Básico II. (Balão Verde)",
    "O Treinamento Básico II é focado majoritariamente em ensinar o “apresente-se” aos novos Praças do Exército.",
    "São cinco tópicos ao total, mas sua maior preocupação deve ser garantir que o Soldado entenda como se apresentar.",
    "Você, enquanto treinador, precisa se certificar de que o treino será o mais instrutivo possível.",
    "Parte disso fará ao utilizar o script para aplicar o treinamento e se mantendo fiel às informações ali apresentadas.",
    "Não se esqueça de utilizar o balão VERDE para o título e o BRANCO para a explicação,",
    "assim como em todos os treinamentos que aplicará.",
    "Dúvidas?",
    "III. Teste prático. (Balão Verde)",
    "A parte mais importante do T2 é o teste prático.",
    "É onde o Soldado aprenderá, de maneira prática, a realizar o “apresente-se”.",
    "O treinador deve seguir rigorosamente todas as etapas com o treinado e corrigi-lo quando necessário.",
    "Indique ao treinado que anote todas as informações.",
    "A medida do possível deve-se persistir para que o Soldado fale as frases corretamente.",
    "Caso esteja com um Auxiliar, é recomendado fazer uma demonstração prática com o Aluno.",
    "O “apresente-se” é essencial para o Soldado e ele o utilizará sempre dali em diante.",
    "E você, o treinador, será o responsável por ensinar algo tão importante.",
    "IV. Finalização. (Balão Verde)",
    "Parabéns, você foi aprovado no Treinamento Preparatório II.",
    "Altere TpR por Tp2 em sua missão.",
    "Caso queira ser avaliado em T2, informe a um oficial da Segunda Companhia."
];

const container = document.getElementById('container');
const alertBox = document.getElementById('alert');
const copyPreviousButton = document.getElementById('copyPrevious');
const copyNextButton = document.getElementById('copyNext');
const startAutoCopyButton = document.getElementById('startAutoCopy');
const stopAutoCopyButton = document.getElementById('stopAutoCopy');

let autoCopyInterval;

contentArray.forEach((paragraph, index) => {
    const p = document.createElement('p');
    p.className = 'paragraph';
    if (paragraph.includes('(Balão Verde)')) {
        p.classList.add('balao-verde');
    }
    p.dataset.index = index;
    p.innerText = paragraph;
    container.appendChild(p);
});

const paragraphs = document.querySelectorAll('.paragraph');

function copyText(index) {
    if (index < 0 || index >= paragraphs.length) return;

    const textToCopy = paragraphs[index].innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        paragraphs.forEach(p => p.classList.remove('copied'));
        paragraphs[index].classList.add('copied');

        // Scroll to center the paragraph
        const containerHeight = container.clientHeight;
        const paragraphOffsetTop = paragraphs[index].offsetTop;
        const paragraphHeight = paragraphs[index].offsetHeight;
        const scrollTop = paragraphOffsetTop - (containerHeight / 2) + (paragraphHeight / 2);
        container.scrollTo({ top: scrollTop, behavior: 'smooth' });

        // Show alert if paragraph contains "(Balão Verde)"
        if (paragraphs[index].classList.contains('balao-verde')) {
            showAlert();
            clearInterval(autoCopyInterval); // Stop the timer if "(Balão Verde)" is found
        }
    }).catch(err => console.error('Failed to copy text: ', err));
}

function showAlert() {
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
        enableButtons();
    }, 3000);
}

function enableButtons() {
    copyPreviousButton.disabled = false;
    copyNextButton.disabled = false;
}

let currentIndex = 0;

copyPreviousButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        copyText(currentIndex);
    }
});

copyNextButton.addEventListener('click', () => {
    if (currentIndex < paragraphs.length - 1) {
        currentIndex++;
        copyText(currentIndex);
    }
});

startAutoCopyButton.addEventListener('click', () => {
    clearInterval(autoCopyInterval); // Clear any existing interval to prevent multiple intervals running
    autoCopyInterval = setInterval(() => {
        if (currentIndex < paragraphs.length - 1) {
            currentIndex++;
            copyText(currentIndex);
        } else {
            clearInterval(autoCopyInterval);
        }
    }, 6000);
});

stopAutoCopyButton.addEventListener('click', () => {
    clearInterval(autoCopyInterval);
});

window.onload = () => {
    copyText(currentIndex);
};