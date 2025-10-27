// 游戏状态管理
class GameState {
    constructor() {
        this.character = null;
        this.npcs = [];
        this.currentStory = "";
        this.choices = [];
        this.storyHistory = [];
        this.pastLives = this.loadPastLives();
        this.hasReincarnationMemory = false;
    }

    // 加载前世记忆
    loadPastLives() {
        const saved = localStorage.getItem('pastLives');
        return saved ? JSON.parse(saved) : [];
    }

    // 保存前世记忆
    savePastLives() {
        localStorage.setItem('pastLives', JSON.stringify(this.pastLives));
    }

    // 保存当前游戏状态
    saveCurrentGame() {
        const gameData = {
            character: this.character,
            npcs: this.npcs,
            currentStory: this.currentStory,
            choices: this.choices,
            storyHistory: this.storyHistory
        };
        localStorage.setItem('currentGame', JSON.stringify(gameData));
    }

    // 加载当前游戏状态
    loadCurrentGame() {
        const saved = localStorage.getItem('currentGame');
        if (saved) {
            const gameData = JSON.parse(saved);
            this.character = gameData.character;
            this.npcs = gameData.npcs;
            this.currentStory = gameData.currentStory;
            this.choices = gameData.choices;
            this.storyHistory = gameData.storyHistory;
            return true;
        }
        return false;
    }
}

// 随机生成数据
class RandomGenerator {
    static names = ["李明", "王芳", "张伟", "刘洋", "陈静", "杨帆", "赵磊", "周雨"];
    static professions = ["医生", "学生", "画家", "程序员", "农民", "教师", "艺术家", "工程师", "作家", "音乐家"];
    static personalities = ["勇敢", "悲观", "浪漫", "务实", "乐观", "内向", "外向", "理性", "感性"];
    static locations = ["中国", "日本", "美国", "火星殖民地", "月球基地", "海底城市", "天空之城"];
    static dreams = ["成为演员", "找到真爱", "环游世界", "获得财富", "拯救世界", "创造艺术", "探索未知", "家庭幸福"];
    static fears = ["失败", "孤独", "平庸", "死亡", "背叛", "贫穷", "疾病"];
    static values = ["自由", "真实", "成功", "爱", "平静", "正义", "知识", "力量"];

    static random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static randomAge() {
        return Math.floor(Math.random() * (80 - 16 + 1)) + 16;
    }
}

// 故事生成器
class StoryGenerator {
    static generateCharacter(characterData) {
        const { name, gender, age, profession, personality, era, location, dream, maritalStatus, influencer, mentalState, fear, values, familyBackground } = characterData;

        return `在${era}的${location}，${age}岁的${gender}性${name}是一位${profession}。${gender}性性格${personality}，出身于${familyBackground}家庭。
当前${gender}性感到${mentalState}，最大的恐惧是${fear}，人生信条是${values}。
${maritalStatus === "已婚" ? name + "已经结婚" : name + "目前" + maritalStatus}，生命中最重要的人是${influencer}。
${name}的人生梦想是${dream}，这个梦想驱动着${gender}性的每一个选择。`;
    }

    static generateNPCs(characterData, count = 3) {
        const npcs = [];
        const relationships = ["家人", "朋友", "导师", "对手", "爱人", "同事"];

        for (let i = 0; i < count; i++) {
            const npc = {
                name: RandomGenerator.random(RandomGenerator.names),
                relationship: RandomGenerator.random(relationships),
                personality: RandomGenerator.random(RandomGenerator.personalities),
                age: RandomGenerator.randomAge(),
                relationValue: Math.random() * 10 - 5 // -5 到 10 的关系值
            };
            npcs.push(npc);
        }

        return npcs;
    }

    static generateInitialEvent(character, npcs) {
        const events = [
            `一天早上，${character.name}收到了一封神秘的信件，信中提到了一个关于${character.dream}的重要机会。`,
            `${character.name}在上班路上遇到了${npcs[0].name}，${npcs[0].name}看起来很焦虑，似乎有什么重要的事情要告诉${character.gender === '男' ? '他' : '她'}。`,
            `一个意外的电话改变了${character.name}的平静生活——${character.influencer}遇到了麻烦，需要${character.gender === '男' ? '他' : '她'}的帮助。`,
            `${character.name}发现了一个古老的日记，里面记录着关于${character.location}历史的秘密，这个发现可能会影响${character.gender === '男' ? '他' : '她'}的${character.dream}。`,
            `经济危机突然来临，${character.name}作为${character.profession}面临失业的风险。与此同时，一个看似有争议但报酬丰厚的工作机会出现了。`
        ];

        return RandomGenerator.random(events);
    }

    static generateStoryProgression(character, npcs, lastChoice, storyHistory) {
        // 这里可以集成AI API，现在使用模拟逻辑
        const progressions = [
            `基于${character.name}的选择，生活发生了微妙的变化。${npcs[0].name}对${character.gender === '男' ? '他' : '她'}的态度变得更加${npcs[0].relationValue > 0 ? '友好' : '冷淡'}。`,
            `时间流逝，${character.name}在追求${character.dream}的道路上遇到了新的挑战。`,
            `${character.mentalState}的情绪影响了${character.name}的判断力，${character.gender === '男' ? '他' : '她'}开始重新思考自己的人生价值观。`,
            `一个意外的机会出现了，这与${character.dream}息息相关，但也伴随着风险。`,
            `${character.fear}的阴影笼罩着${character.name}，${character.gender === '男' ? '他' : '她'}必须面对内心深处的恐惧。`
        ];

        return RandomGenerator.random(progressions);
    }

    static generateChoice(character, npcs, currentStory) {
        const choices = [
            {
                text: "接受挑战，抓住机会",
                consequence: "勇往直前"
            },
            {
                text: "谨慎行事，寻求帮助",
                consequence: "稳扎稳打"
            },
            {
                text: "放弃当前，另寻出路",
                consequence: "改变方向"
            }
        ];

        return choices;
    }

    static generateEnding(character, choices) {
        const endings = {
            death: {
                title: "💀 生命的终点",
                text: `${character.name}的人生在这里画上了句号。虽然旅程结束了，但${character.gender === '男' ? '他' : '她'}的故事还没有结束——每一次死亡都是新生的开始。`,
                type: "death"
            },
            unfulfilled: {
                title: "⏳ 未完成的梦想",
                text: `${character.name}的人生虽然平淡，但仍有未竟之梦。是选择重新开始，还是在平静中寻找新的意义？`,
                type: "unfulfilled"
            },
            success: {
                title: "🌟 梦想实现",
                text: `恭喜！${character.name}终于实现了${character.dream}的梦想。但成功之后，新的挑战和机会又在前方等待。`,
                type: "success"
            }
        };

        // 根据选择数量和类型随机生成结局
        const randomEnding = Math.random();
        if (randomEnding < 0.2) {
            return endings.death;
        } else if (randomEnding < 0.6) {
            return endings.unfulfilled;
        } else {
            return endings.success;
        }
    }
}

// 页面控制器
class PageController {
    constructor() {
        this.gameState = new GameState();
        this.currentPage = 'welcome-page';
        this.initializeEventListeners();
        this.checkForReincarnationMemory();
    }

    initializeEventListeners() {
        // 表单提交
        document.getElementById('character-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startGame();
        });

        // 随机生成按钮
        document.querySelectorAll('.random-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const field = e.target.dataset.field;
                this.fillRandomField(field);
            });
        });

        // 全部随机按钮
        document.getElementById('random-all-btn').addEventListener('click', () => {
            this.fillAllRandom();
        });

        // 开始故事按钮
        document.getElementById('start-story-btn').addEventListener('click', () => {
            this.startStory();
        });

        // 提交选择按钮
        document.getElementById('submit-choice').addEventListener('click', () => {
            this.submitChoice();
        });

        // 选择选项点击事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.choice-option')) {
                this.selectChoice(e.target.closest('.choice-option'));
            }
        });
    }

    checkForReincarnationMemory() {
        // 10%概率触发前世记忆
        if (this.gameState.pastLives.length > 0 && Math.random() < 0.1) {
            this.gameState.hasReincarnationMemory = true;
            const pastLife = this.gameState.pastLives[this.gameState.pastLives.length - 1];

            setTimeout(() => {
                alert(`🌙 前世的记忆...\n你总觉得对某些事情有莫名的熟悉感。也许在你上一次的人生中，${pastLife.name}也曾面临过类似的选择...`);
            }, 2000);
        }
    }

    fillRandomField(field) {
        const input = document.getElementById(field);
        if (!input) return;

        const fieldMap = {
            'name': () => RandomGenerator.random(RandomGenerator.names),
            'age': () => RandomGenerator.randomAge(),
            'profession': () => RandomGenerator.random(RandomGenerator.professions),
            'personality': () => RandomGenerator.random(RandomGenerator.personalities),
            'location': () => RandomGenerator.random(RandomGenerator.locations),
            'dream': () => RandomGenerator.random(RandomGenerator.dreams),
            'influencer': () => RandomGenerator.random(["母亲", "父亲", "导师", "朋友", "爱人"]),
            'mental-state': () => RandomGenerator.random(["希望", "焦虑", "平静", "孤独", "兴奋"]),
            'fear': () => RandomGenerator.random(RandomGenerator.fears),
            'values': () => RandomGenerator.random(RandomGenerator.values)
        };

        if (fieldMap[field]) {
            input.value = fieldMap[field]();
        }
    }

    fillAllRandom() {
        const fields = ['name', 'age', 'profession', 'personality', 'location', 'dream', 'influencer', 'mental-state', 'fear', 'values'];
        fields.forEach(field => this.fillRandomField(field));

        // 随机选择下拉菜单
        document.getElementById('gender').selectedIndex = Math.floor(Math.random() * 3);
        document.getElementById('era').selectedIndex = Math.floor(Math.random() * 3);
        document.getElementById('marital-status').selectedIndex = Math.floor(Math.random() * 4);
        document.getElementById('family-background').selectedIndex = Math.floor(Math.random() * 4);
    }

    startGame() {
        const formData = new FormData(document.getElementById('character-form'));
        this.gameState.character = {
            name: formData.get('name') || RandomGenerator.random(RandomGenerator.names),
            gender: formData.get('gender'),
            age: parseInt(formData.get('age')) || RandomGenerator.randomAge(),
            profession: formData.get('profession') || RandomGenerator.random(RandomGenerator.professions),
            personality: formData.get('personality') || RandomGenerator.random(RandomGenerator.personalities),
            era: formData.get('era'),
            location: formData.get('location') || RandomGenerator.random(RandomGenerator.locations),
            dream: formData.get('dream') || RandomGenerator.random(RandomGenerator.dreams),
            maritalStatus: formData.get('maritalStatus'),
            influencer: formData.get('influencer') || RandomGenerator.random(["母亲", "导师", "朋友"]),
            mentalState: formData.get('mentalState') || RandomGenerator.random(["希望", "焦虑", "平静"]),
            fear: formData.get('fear') || RandomGenerator.random(RandomGenerator.fears),
            values: formData.get('values') || RandomGenerator.random(RandomGenerator.values),
            familyBackground: formData.get('familyBackground')
        };

        this.showPage('generation-page');
        this.generateWorld();
    }

    generateWorld() {
        // 生成NPCs
        this.gameState.npcs = StoryGenerator.generateNPCs(this.gameState.character);

        // 生成初始事件
        const initialEvent = StoryGenerator.generateInitialEvent(this.gameState.character, this.gameState.npcs);

        // 显示生成的内容
        setTimeout(() => {
            this.displayGeneratedContent(initialEvent);
        }, 1500);
    }

    displayGeneratedContent(initialEvent) {
        document.querySelector('.loading-spinner').style.display = 'none';
        document.getElementById('generated-content').style.display = 'block';

        // 显示角色信息
        const characterInfo = document.getElementById('character-info');
        characterInfo.innerHTML = `
            <h3>${this.gameState.character.name}</h3>
            <p><strong>年龄：</strong>${this.gameState.character.age}岁</p>
            <p><strong>职业：</strong>${this.gameState.character.profession}</p>
            <p><strong>性格：</strong>${this.gameState.character.personality}</p>
            <p><strong>梦想：</strong>${this.gameState.character.dream}</p>
            <p><strong>背景：</strong>${this.gameState.character.era} · ${this.gameState.character.location}</p>
        `;

        // 显示NPCs
        const npcGrid = document.getElementById('npc-grid');
        npcGrid.innerHTML = this.gameState.npcs.map((npc, index) => `
            <div class="npc-card">
                <div class="npc-avatar">👤</div>
                <h4>${npc.name}</h4>
                <p><strong>关系：</strong>${npc.relationship}</p>
                <p><strong>性格：</strong>${npc.personality}</p>
                <p><strong>关系值：</strong>${npc.relationValue > 0 ? '友好' : '复杂'}</p>
            </div>
        `).join('');

        // 显示初始事件
        document.getElementById('event-text').innerHTML = `
            ${StoryGenerator.generateCharacter(this.gameState.character)}
            <br><br>
            <strong>故事开始：</strong><br>
            ${initialEvent}
        `;
    }

    startStory() {
        this.showPage('story-page');
        this.initializeStory();
    }

    initializeStory() {
        // 显示角色概要
        const characterSummary = document.getElementById('character-summary');
        characterSummary.innerHTML = `
            <strong>${this.gameState.character.name}</strong> · ${this.gameState.character.age}岁 ${this.gameState.character.profession} · 梦想：${this.gameState.character.dream}
        `;

        // 开始故事
        this.progressStory();
    }

    progressStory() {
        // 生成故事进展
        const storyProgression = StoryGenerator.generateStoryProgression(
            this.gameState.character,
            this.gameState.npcs,
            this.gameState.choices,
            this.gameState.storyHistory
        );

        const storyText = document.getElementById('story-text');
        storyText.innerHTML += `<p>${storyProgression}</p>`;
        this.gameState.storyHistory.push(storyProgression);

        // 生成选择
        setTimeout(() => {
            this.presentChoice();
        }, 2000);
    }

    presentChoice() {
        const choices = StoryGenerator.generateChoice(this.gameState.character, this.gameState.npcs, this.gameState.currentStory);
        const choiceSection = document.getElementById('choice-section');
        const choicesContainer = document.getElementById('choices');

        choicesContainer.innerHTML = choices.map((choice, index) => `
            <div class="choice-option" data-choice="${index}">
                <input type="radio" name="choice" value="${index}" id="choice-${index}">
                <div class="choice-content">
                    <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
                    <span>${choice.text}</span>
                </div>
            </div>
        `).join('');

        // 添加自定义选项
        choicesContainer.innerHTML += `
            <div class="choice-option" data-choice="custom">
                <input type="radio" name="choice" value="custom" id="choice-custom">
                <div class="choice-content">
                    <span class="choice-letter">✏️</span>
                    <span><input type="text" placeholder="自定义你的选择..." id="custom-choice" style="border: none; background: transparent; width: 100%; font-size: 16px;"></span>
                </div>
            </div>
        `;

        choiceSection.style.display = 'block';
    }

    selectChoice(choiceElement) {
        // 移除之前的选择
        document.querySelectorAll('.choice-option').forEach(el => el.classList.remove('selected'));

        // 添加选择状态
        choiceElement.classList.add('selected');
        const radio = choiceElement.querySelector('input[type="radio"]');
        radio.checked = true;
    }

    submitChoice() {
        const selectedChoice = document.querySelector('input[name="choice"]:checked');
        const reason = document.getElementById('choice-reason').value.trim();

        if (!selectedChoice) {
            alert('请选择一个选项！');
            return;
        }

        if (reason.length < 10) {
            alert('请输入至少10字的选择原因！');
            return;
        }

        // 处理选择
        let choiceText;
        if (selectedChoice.value === 'custom') {
            choiceText = document.getElementById('custom-choice').value || '自定义选择';
        } else {
            const choiceOptions = document.querySelectorAll('.choice-option');
            choiceText = choiceOptions[selectedChoice.value].querySelector('.choice-content span:last-child').textContent;
        }

        // 保存选择
        this.gameState.choices.push({
            text: choiceText,
            reason: reason,
            timestamp: new Date().toISOString()
        });

        // 显示选择反馈
        const storyText = document.getElementById('story-text');
        storyText.innerHTML += `
            <div style="background: #f7fafc; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #667eea;">
                <strong>你的选择：</strong>${choiceText}<br>
                <strong>原因：</strong>${reason}
            </div>
        `;

        // 隐藏选择部分
        document.getElementById('choice-section').style.display = 'none';
        document.getElementById('choice-reason').value = '';

        // 决定是继续故事还是结束
        const continueProbability = Math.random();
        if (this.gameState.choices.length < 3 || continueProbability < 0.7) {
            // 继续故事
            setTimeout(() => {
                this.progressStory();
            }, 2000);
        } else {
            // 生成结局
            setTimeout(() => {
                this.generateEnding();
            }, 2000);
        }

        // 保存游戏状态
        this.gameState.saveCurrentGame();
    }

    generateEnding() {
        const ending = StoryGenerator.generateEnding(this.gameState.character, this.gameState.choices);

        const endingSection = document.getElementById('ending-section');
        endingSection.innerHTML = `
            <h2 class="ending-title">${ending.title}</h2>
            <p class="ending-text">${ending.text}</p>

            <div class="story-summary">
                <h3>📖 你的人生回顾</h3>
                <div style="text-align: left; margin: 20px 0;">
                    <p><strong>角色：</strong>${this.gameState.character.name} - ${this.gameState.character.profession}</p>
                    <p><strong>关键选择：</strong></p>
                    <ul>
                        ${this.gameState.choices.map(choice => `<li>${choice.text} - ${choice.reason}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="ending-actions">
                <button class="rebirth-btn" onclick="gameController.rebirth()">🔄 重获新生</button>
                <button class="rebirth-btn" onclick="gameController.shareStory()">📤 分享故事</button>
            </div>
        `;

        endingSection.style.display = 'block';

        // 保存前世记忆
        this.gameState.pastLives.push({
            name: this.gameState.character.name,
            profession: this.gameState.character.profession,
            dream: this.gameState.character.dream,
            ending: ending.type,
            timestamp: new Date().toISOString()
        });
        this.gameState.savePastLives();

        // 清除当前游戏
        localStorage.removeItem('currentGame');
    }

    rebirth() {
        // 重置游戏状态
        this.gameState = new GameState();
        this.gameState.pastLives = this.loadPastLives();

        // 返回欢迎页面
        this.showPage('welcome-page');
        document.getElementById('character-form').reset();

        // 再次检查前世记忆
        this.checkForReincarnationMemory();
    }

    shareStory() {
        const storyText = `
《${this.gameState.character.name}的人生故事》

角色：${this.gameState.character.name}，${this.gameState.character.age}岁${this.gameState.character.profession}
时代：${this.gameState.character.era} · ${this.gameState.character.location}
梦想：${this.gameState.character.dream}

关键选择：
${this.gameState.choices.map((choice, index) => `${index + 1}. ${choice.text}\n   原因：${choice.reason}`).join('\n')}

结局：${this.gameState.character.name}的人生...

---
"我的千万种活法" - 探索人生的无限可能
        `;

        // 创建分享链接（模拟）
        if (navigator.share) {
            navigator.share({
                title: `${this.gameState.character.name}的人生故事`,
                text: storyText
            }).catch(err => console.log('分享失败:', err));
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(storyText).then(() => {
                alert('故事已复制到剪贴板！');
            });
        }
    }

    showPage(pageId) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // 显示目标页面
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;
    }
}

// 初始化游戏
const gameController = new PageController();

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 尝试加载之前的游戏进度
    if (gameController.gameState.loadCurrentGame()) {
        if (confirm('发现未完成的游戏，是否继续？')) {
            gameController.showPage('story-page');
            gameController.initializeStory();
        }
    }
});