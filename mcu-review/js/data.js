/**
 * 单片机项目复盘 —— 数据层
 * 后续新增项目 / 技能 / 笔记，只需修改本文件即可，无需改动渲染逻辑。
 */

/* ---------- 概览统计 ---------- */
const stats = [
  { label: "完成项目", value: "6", suffix: "个" },
  { label: "累计开发", value: "320", suffix: "h" },
  { label: "掌握技能点", value: "48", suffix: "项" },
  { label: "踩过的坑", value: "37", suffix: "个" },
];

/* ---------- 项目复盘 ----------
 * status: 已完成 / 进行中 / 规划中
 * level: 入门 / 进阶 / 综合
 */
const projects = [
  {
    name: "循迹避障小车",
    date: "2024.03",
    status: "已完成",
    level: "入门",
    summary:
      "基于 STM32F103，实现红外循迹 + 超声波避障，PWM 调速控制双路电机。第一次完整跑通「采集 → 决策 → 执行」闭环。",
    highlights: [
      "GPIO 外部中断与定时器 PWM 输出",
      "红外对管 AD 采样阈值判定",
      "PID 增量式调速",
    ],
    stack: ["STM32F103", "C", "HAL 库", "PWM", "ADC"],
  },
  {
    name: "桌面气象站",
    date: "2024.06",
    status: "已完成",
    level: "进阶",
    summary:
      "DHT11 + BMP280 + OLED 显示温湿度气压，按键切换页面，数据通过串口上传上位机。开始系统化接触传感器驱动与协议。",
    highlights: [
      "I2C / SPI 时序驱动 BMP280",
      "OLED SSD1306 字库与页面管理",
      "串口数据帧打包与校验",
    ],
    stack: ["STM32F103", "I2C", "SPI", "UART", "OLED"],
  },
  {
    name: "蓝牙门锁",
    date: "2024.09",
    status: "已完成",
    level: "进阶",
    summary:
      "HC-05 蓝牙模块接收手机指令控制舵机开锁，带密码校验与掉电状态保持。第一次处理安全校验与状态机。",
    highlights: [
      "USART 蓝牙透传与指令解析",
      "Flash 存储密码与状态",
      "有限状态机设计（锁定/解锁/设置）",
    ],
    stack: ["STM32F103", "USART", "Flash", "舵机", "状态机"],
  },
  {
    name: "FreeRTOS 多任务灯控",
    date: "2024.11",
    status: "已完成",
    level: "进阶",
    summary:
      "引入 FreeRTOS，将按键、显示、通信拆分为独立任务，用队列与信号量同步。理解了裸机前后台与 RTOS 的本质区别。",
    highlights: [
      "任务创建与优先级调度",
      "队列 / 信号量 / 互斥量",
      "临界区与中断管理",
    ],
    stack: ["STM32F103", "FreeRTOS", "队列", "信号量"],
  },
  {
    name: "CAN 总线多节点通信",
    date: "2025.02",
    status: "进行中",
    level: "综合",
    summary:
      "两块 STM32 通过 CAN 总线组网，主节点下发指令、从节点上报传感器数据。目标是打通工业现场总线的完整链路。",
    highlights: [
      "CAN 协议帧与过滤器配置",
      "bxCAN 收发中断",
      "多节点地址与心跳机制",
    ],
    stack: ["STM32F103", "CAN", "bxCAN", "中断"],
  },
  {
    name: "便携示波器雏形",
    date: "2025.05",
    status: "规划中",
    level: "综合",
    summary:
      "高速 ADC + DMA + LCD 实时波形显示，计划加入 FFT 频谱分析。目标是把采样率做到 1MSPS 以上。",
    highlights: [
      "ADC + DMA 连续采样",
      "LCD 高速刷屏与波形绘制",
      "FFT 频谱分析（计划中）",
    ],
    stack: ["STM32F407", "ADC", "DMA", "LCD", "DSP"],
  },
];

/* ---------- 技能树 ----------
 * mastery: 0-100 掌握度
 * children: 子技能，可继续嵌套（渲染递归）
 */
const skillTree = [
  {
    name: "硬件设计",
    mastery: 70,
    children: [
      { name: "原理图设计", mastery: 75, tags: ["KiCad", "立创 EDA"] },
      { name: "PCB Layout", mastery: 60, tags: ["KiCad", "4 层板"] },
      { name: "元器件选型", mastery: 70, tags: ["数据手册"] },
      { name: "焊接与调试", mastery: 80, tags: ["0805", "QFP"] },
      { name: "电源设计", mastery: 55, tags: ["LDO", "DC-DC"] },
    ],
  },
  {
    name: "嵌入式软件",
    mastery: 78,
    children: [
      { name: "C / C++ 编程", mastery: 82, tags: ["指针", "结构体"] },
      { name: "寄存器开发", mastery: 70, tags: ["STM32"] },
      { name: "HAL / LL 库", mastery: 78, tags: ["STM32"] },
      { name: "中断与异常", mastery: 75, tags: ["NVIC"] },
      { name: "定时器", mastery: 80, tags: ["PWM", "输入捕获"] },
      { name: "ADC / DAC", mastery: 72, tags: ["DMA"] },
      { name: "看门狗", mastery: 65, tags: ["IWDG", "WWDG"] },
    ],
  },
  {
    name: "通信协议",
    mastery: 68,
    children: [
      { name: "UART / USART", mastery: 85, tags: ["DMA", "空闲中断"] },
      { name: "I2C", mastery: 72, tags: ["软件 / 硬件"] },
      { name: "SPI", mastery: 70, tags: ["全双工"] },
      { name: "CAN", mastery: 55, tags: ["bxCAN"] },
      { name: "USB", mastery: 40, tags: ["CDC"] },
      { name: "1-Wire", mastery: 60, tags: ["DS18B20"] },
    ],
  },
  {
    name: "操作系统",
    mastery: 60,
    children: [
      { name: "裸机前后台", mastery: 85, tags: ["超级循环"] },
      { name: "FreeRTOS", mastery: 65, tags: ["任务/队列"] },
      { name: "任务调度", mastery: 60, tags: ["优先级"] },
      { name: "同步原语", mastery: 58, tags: ["信号量/互斥量"] },
    ],
  },
  {
    name: "调试与工具",
    mastery: 73,
    children: [
      { name: "Keil MDK", mastery: 82, tags: ["编译/下载"] },
      { name: "STM32CubeMX", mastery: 78, tags: ["配置生成"] },
      { name: "J-Link / ST-Link", mastery: 80, tags: ["SWD"] },
      { name: "示波器", mastery: 65, tags: ["时序测量"] },
      { name: "逻辑分析仪", mastery: 60, tags: ["协议解析"] },
      { name: "串口助手", mastery: 85, tags: ["调试打印"] },
    ],
  },
  {
    name: "工程素养",
    mastery: 62,
    children: [
      { name: "Git 版本控制", mastery: 70, tags: ["分支/提交"] },
      { name: "模块化编程", mastery: 68, tags: ["分层"] },
      { name: "文档撰写", mastery: 55, tags: ["README"] },
      { name: "代码规范", mastery: 60, tags: ["命名"] },
    ],
  },
];

/* ---------- 复盘笔记（时间线） ---------- */
const timeline = [
  {
    date: "2024.03",
    title: "点亮第一颗 LED",
    text: "从寄存器点灯开始，理解了 GPIO 时钟使能 → 配置 → 输出的完整流程。踩坑：忘记使能时钟导致引脚无响应。",
    tag: "基础",
  },
  {
    date: "2024.06",
    title: "第一次调不通 I2C",
    text: "BMP280 一直读不到 ID，最后发现是 SDA/SCL 上拉电阻没焊。教训：通信协议先查硬件电气层，再查软件时序。",
    tag: "硬件",
  },
  {
    date: "2024.09",
    title: "状态机拯救了门锁",
    text: "最初用 if-else 堆叠，加新功能就乱。重写成状态机后，逻辑清晰、易扩展。从此每个项目都先画状态图。",
    tag: "架构",
  },
  {
    date: "2024.11",
    title: "从裸机到 RTOS",
    text: "多任务后串口数据偶尔丢失，根源是任务优先级反转。加互斥量 + 调整优先级解决。理解了「并发 ≠ 并行」。",
    tag: "RTOS",
  },
  {
    date: "2025.02",
    title: "CAN 总线启动失败",
    text: "两个节点波特率不一致导致总线错误被动。用示波器测位时序后统一配置。教训：总线类通信先对齐物理参数。",
    tag: "协议",
  },
];

/* ---------- 后续规划 ---------- */
const roadmap = [
  { phase: "下一步", title: "项目详情页", desc: "每个项目点击进入独立页面，展开代码片段、原理图、调试记录。" },
  { phase: "下一步", title: "技能树交互增强", desc: "支持点击技能查看关联项目、学习笔记与资源链接。" },
  { phase: "规划中", title: "后台 / Markdown 驱动", desc: "内容改为读取 Markdown 文件，便于离线撰写、版本管理。" },
  { phase: "规划中", title: "搜索与标签筛选", desc: "按技能标签、芯片型号、项目状态快速检索复盘内容。" },
  { phase: "远期", title: "代码片段高亮", desc: "集成语法高亮，展示关键寄存器配置与驱动代码。" },
];
