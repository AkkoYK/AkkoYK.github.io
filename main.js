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
        const finishBtn = document.getElementById('finishBtn');

        if (currentSlide === 0) {
            prevBtn.style.display = 'none';
            postUser();
        } else {
            prevBtn.style.display = 'block';
        }

        if (currentSlide === slides.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
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
if (currentSlide === 5) {
    fetchGPTtitleAndReplace();
}
if (currentSlide === 6) {
    fetchGPTcontentAndReplace();
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
                    { role: "user", content: "我要举报一所学校，请帮我改写一个举报标题，要求内容严谨，语义不能发生改变，不能产生歧义，且仅回复我改写后的内容而不要加任何提示语。以下为待改写的标题：昆明市第一中学西山学校违规强制收费补课" } // 请替换为你的实际用户输入
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
                    { role: "user", content: "我要举报一所学校，请帮我改写一个举报正文，要求内容严谨，语义不能发生改变，不能产生歧义，且仅回复我改写后的内容而不要加任何提示语。以下为待改写的正文：尊敬的昆明教体局领导们，您们好！假期即将到来，作为昆明市第一中学西山学校的一名高二年级的学生，居然被学校违规收费强制补课，要求我们在学业水平考试结束后继续补一周课，将放假时间延后至1月28号，这严重损害了莘莘学子的合法权益，还扰乱了我们家庭的日程安排，更不符合双减“政策”的要求！在此，请求各位领导叔叔阿姨们，为了祖国的花朵们，尽快严肃处理这件事。"}
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


//参与统计
function recordUser() {
    // 增加1名参与人数
    fetch('https://killyx.onrender.com/increase', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // 可以传递任意数据，因为在服务器端我们只关心请求的方法
    })
        .then(response => response.json())
        .then(data => {
        console.log('增加1名参与人数后的总人数：', data.count);
        document.getElementById('finishBtn').remove();
        alert("恭喜！你是第" + data.count + "个完成的小伙伴！由衷感谢你为我们每个人的假期做出的贡献！现在，你可以关掉此页面了。");
        })
        .catch(error => console.error('增加参与人数失败：', error));

}

function postUser() {
    // 获取已参与的人数
    fetch('https://killyx.onrender.com/participation')
    .then(response => response.json())
    .then(data => {
    console.log('已参与的人数：', data.count);
    const nameElement = document.getElementById('user');
    nameElement.innerText = "已有 " + data.count + " 人在咱的指导下成功了哦~";    
    })
    .catch(error => console.error('获取已参与人数失败：', error));
}
