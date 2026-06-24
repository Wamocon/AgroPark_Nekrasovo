import { BarChart3, Bot, CalendarCheck, CheckCircle2, FileText, Gauge, Home, Landmark, Leaf, MapPinned, MessageSquareText, ShieldCheck, Sparkles, Ticket } from "lucide-react";

export const agroparkBrand = { name: "Некрасово поле", legalName: "АгроПарк Некрасово поле", tagline: "семейный агропарк, события, гриль-купола и цифровое бронирование", audience: "семьи, туристы, школы, компании и команда парка" };
export const agroparkContact = { phone: "+7 (911) 474-30-04", phoneHref: "tel:+79114743004", email: "info@agroparknp.ru", emailHref: "mailto:info@agroparknp.ru", region: "поселок Некрасово, Гурьевский муниципальный округ, Калининградская область", season: "май-сентябрь", hours: "вторник-воскресенье, 10:00-19:00; понедельник закрыто", telegram: "@adm_agropark39", whatsapp: "+7 (905) 243-27-39", vk: "vk.com/agropark39" };
export const demoAccounts = [
  { role: "Директор", email: "admin@agropark.demo", scope: "полный доступ к KPI, заявкам, AI и операциям" },
  { role: "Менеджер", email: "manager@agropark.demo", scope: "бронирования, календарь, ответы гостям, события и загрузка зон" },
  { role: "Администратор", email: "staff@agropark.demo", scope: "ежедневные заявки, контактные формы, подтверждения и лента активности" },
  { role: "Гость", email: "visitor@agropark.demo", scope: "просмотр брони, вопросы AI, цены, маршрут и статус обращения" },
];
export const operationsKpis = [
  { label: "Брони сегодня", value: "47", change: "+12% к прошлому дню", icon: CalendarCheck },
  { label: "Открытые заявки", value: "8", change: "3 ждут ответа команды", icon: MessageSquareText },
  { label: "Загрузка зон", value: "78%", change: "+5% в реальном времени", icon: BarChart3 },
  { label: "Форматы отдыха", value: "6", change: "экскурсии, купола, события", icon: Leaf },
];
export const recentActivity = [
  { user: "AI Assist", action: "ответил гостю о цене большого гриль-купола", time: "2 мин назад", amount: "чат" },
  { user: "Администратор", action: "подтвердил семейную бронь на воскресенье", time: "8 мин назад", amount: "бронь" },
  { user: "Менеджер", action: "добавил корпоративное мероприятие в календарь", time: "14 мин назад", amount: "событие" },
  { user: "CRM", action: "выделила пиковые часы по куполам и экскурсиям", time: "21 мин назад", amount: "аналитика" },
];
export const productModules = [
  { title: "Онлайн-бронирование", metric: "3 шага", text: "Гость выбирает формат отдыха, дату, контактные данные и получает понятное подтверждение заявки.", href: "/buchung", action: "Открыть бронь", icon: Ticket },
  { title: "AI-помощник", metric: "24/7", text: "Ассистент отвечает о часах работы, ценах, маршруте, гриль-куполах и событиях на русском, немецком, турецком и английском.", href: "/kontakt", action: "Задать вопрос", icon: Sparkles },
  { title: "Операционная CRM", metric: "4 роли", text: "Команда видит заявки, загрузку, KPI, активность и быстрые действия в рабочем интерфейсе.", href: "/login", action: "Вход для команды", icon: Gauge },
];
export const heroActions = [
  { label: "Забронировать отдых", href: "/buchung", icon: Ticket },
  { label: "Спросить AI", href: "/kontakt", icon: Bot },
  { label: "Открыть CRM", href: "/login", icon: Gauge },
];
export const aiAutomations = [
  { title: "Ответы гостям", detail: "Система объясняет часы работы, цены, сезонность, маршрут и условия бронирования.", status: "Активно", icon: Bot },
  { title: "Сводка заявки", detail: "AI превращает сообщение гостя в карточку: формат отдыха, дата, гости и следующий шаг.", status: "Активно", icon: FileText },
  { title: "Повторный контакт", detail: "Администратор получает готовый текст для WhatsApp, Telegram или e-mail.", status: "Beta", icon: MessageSquareText },
  { title: "Безопасный контур", detail: "Платформа не проводит реальные платежи и не запрашивает чувствительные данные.", status: "Контроль", icon: ShieldCheck },
];
export const parkOffers = [
  { title: "Гриль-купола", type: "бронирование зоны", city: "Некрасово", budget: "от 2 300 ₽", score: 96, tags: ["семьи", "компании", "выходные"] },
  { title: "Экскурсии по парку", type: "групповой формат", city: "АгроПарк", budget: "по расписанию", score: 92, tags: ["школы", "туристы", "сезон"] },
  { title: "События и концерты", type: "event-площадка", city: "Некрасово поле", budget: "по заявке", score: 89, tags: ["афиша", "корпоративы", "фото"] },
];
export const grillPrices = [
  { format: "Стандартный купол", capacity: "до 12 человек", weekday: "2 300 ₽ / 4 600 ₽ / 6 300 ₽", weekend: "3 450 ₽ / 6 300 ₽ / 8 000 ₽" },
  { format: "Большой купол", capacity: "до 25 человек", weekday: "3 500 ₽ / 6 000 ₽ / 9 000 ₽", weekend: "5 200 ₽ / 9 200 ₽ / 13 200 ₽" },
];
export const parkPipeline = [
  { stage: "Новые заявки", count: 12, value: "сайт, чат, телефон", tone: "bg-amber-500" },
  { stage: "В работе", count: 8, value: "ожидают ответа", tone: "bg-sky-500" },
  { stage: "Подтверждены", count: 47, value: "сегодня", tone: "bg-emerald-500" },
  { stage: "События", count: 5, value: "корпоративы и группы", tone: "bg-lime-500" },
];
export const clientImages = [
  { src: "/client-assets/agropark/field-road.jpg", alt: "Дорога и природная территория АгроПарка", title: "Природная территория" },
  { src: "/client-assets/agropark/restaurant-view.jpg", alt: "Гостевая зона АгроПарка", title: "Гостевая зона" },
  { src: "/client-assets/agropark/event-space.jpg", alt: "Площадка мероприятий АгроПарка", title: "События" },
  { src: "/client-assets/agropark/agro-machinery.jpg", alt: "Музей сельскохозяйственной техники", title: "Музей техники" },
];
export const parkZones = [
  { name: "Вход", x: 8, y: 16, w: 22, h: 18, tone: "#bbf7d0" }, { name: "Купола", x: 40, y: 14, w: 42, h: 22, tone: "#fed7aa" }, { name: "Сцена", x: 16, y: 48, w: 28, h: 18, tone: "#fde68a" }, { name: "Детская зона", x: 54, y: 48, w: 30, h: 18, tone: "#bfdbfe" }, { name: "Музей", x: 30, y: 76, w: 42, h: 14, tone: "#fecaca" },
];
export const legacyFeatureLinks = [
  { href: "/", label: "Главная", icon: Home }, { href: "/park", label: "Парк", icon: MapPinned }, { href: "/buchung", label: "Бронь", icon: CalendarCheck }, { href: "/kontakt", label: "AI-чат", icon: Bot }, { href: "/dashboard", label: "CRM", icon: Landmark }, { href: "/login", label: "Войти", icon: Gauge }, { href: "/proposal.html", label: "Презентация", icon: CheckCircle2 },
];
