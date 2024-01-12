let currentSlide = 0;

function showSlide(index) {
        const carousel = document.getElementById('carousel');
        const slides = document.querySelectorAll('.slide');
        const progressBar = document.getElementById('progress-bar');

        // 计算当前进度
        const progress = (index / (slides.length - 1)) * 100;
        progressBar.style.width = progress + '%';

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        const offset = -currentSlide * 120 + '%';
        carousel.style.transform = 'translateX(' + offset + ')';

        // 控制按钮的显示和隐藏
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (currentSlide === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        if (currentSlide === slides.length - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
        }

        // 添加/移除闪烁效果的class
        const iframeContainer = document.getElementById('iframe-container');
        iframeContainer.classList.toggle('blink', currentSlide === 1);
        
        // 添加/移除闪烁效果的class
        const infoContainer = document.getElementById('info-container');
        infoContainer.classList.toggle('blink', currentSlide === 0);
    }


function nextSlide() {
    showSlide(currentSlide + 1);
// 只有在切换到第三页时进行GET请求
if (currentSlide === 2) {
    fetchData();
}
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function copyText(element) {
// 获取要复制的文本内容，这里是从传递的元素中获取
var textToCopy = element.innerText;

// 创建一个临时的textarea元素
var tempTextArea = document.createElement("textarea");
tempTextArea.value = textToCopy;
document.body.appendChild(tempTextArea);

// 选中临时textarea的内容
tempTextArea.select();
tempTextArea.setSelectionRange(0, 99999); /* For mobile devices */

// 尝试执行复制命令
document.execCommand("copy");

// 移除临时textarea元素
document.body.removeChild(tempTextArea);

// 提示用户已复制
alert("已复制文本: " + textToCopy + "。请在屏幕下方找到对应一栏手动进行填写");
}

function fetchData() {
        // 使用Fetch API进行GET请求
        fetch('https://v.api.aa1.cn/api/api-xingming/index.php')
            .then(response => response.json())
            .then(data => {
                // 处理返回的JSON数据
                    // 替换姓名元素的文本内容
                    const nameElement = document.getElementById('name');
                    nameElement.innerText = data.xingming;                 
            })
            .catch(error => console.error('Fetch错误:', error));
    }

showSlide(0);

async function fetchGPTtitleAndReplace() {
    try {
        const response = await fetch("https://api.nextapi.fun/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer ak-Q35lveE80Wm0sLEO8LtgOFcp5gdiCX4jBknLg6PbXeTvqyHG", // 替换为你的 OpenAI API 密钥
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-1106",
                messages: [
                    { role: "system", content: "你是一个乐于助人的助理。" },
                    { role: "user", content: "替换为你的用户输入。" } // 请替换为你的实际用户输入
                ]
            })
        });

        const data = await response.json();
        const outputText = data.choices[0].message.content.trim();

        // 替换元素内容
        const reportTitleElement = document.getElementById("reporttitle");
        if (reportTitleElement) {
            reportTitleElement.innerText = outputText;
        } else {
            console.error("Element with ID 'reporttitle' not found.");
        }

    } catch (error) {
        console.error("There was an error fetching the GPT response:", error);
    }
}

async function fetchGPTcontentAndReplace() {
    try {
        const response = await fetch("https://api.nextapi.fun/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer ak-Q35lveE80Wm0sLEO8LtgOFcp5gdiCX4jBknLg6PbXeTvqyHG", // 替换为你的 OpenAI API 密钥
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-1106",
                messages: [
                    { role: "system", content: "你是一个乐于助人的助理。" },
                    { role: "user", content: "替换为你的用户输入。" } // 请替换为你的实际用户输入
                ]
            })
        });

        const data = await response.json();
        const outputText = data.choices[0].message.content.trim();

        // 替换元素内容
        const reportContentElement = document.getElementById("reportcontent");
        if (reportContentElement) {
            reportContentElement.innerText = outputText;
        } else {
            console.error("Element with ID 'reportcontent' not found.");
        }

    } catch (error) {
        console.error("There was an error fetching the GPT response:", error);
    }
}