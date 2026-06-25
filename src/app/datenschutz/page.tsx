import { PageShell } from "@/components/layout/page-shell";
import { agroparkContact, agroparkLegal } from "@/data/agropark";

export default function DatenschutzPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Обработка персональных данных</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none">
            <p>Редакция: июнь 2026</p>

            <h2 className="text-2xl font-bold">1. Оператор персональных данных</h2>
            <p>
              {agroparkLegal.operator}
              <br />ИНН: {agroparkLegal.inn}
              <br />ОГРНИП: {agroparkLegal.ogrnip}
              <br />E-mail: {agroparkContact.email}
              <br />Телефон: {agroparkContact.phone}
              <br />Адрес: {agroparkContact.region}
            </p>

            <h2 className="text-2xl font-bold">2. Правовая основа</h2>
            <p>
              Обработка персональных данных осуществляется в соответствии с Федеральным законом
              Российской Федерации от 27.07.2006 № 152-ФЗ «О персональных данных». Полная
              «Политика конфиденциальности» оператора доступна на официальном сайте:{" "}
              <a href={`${agroparkContact.websiteHref}/politics`} target="_blank" rel="noopener noreferrer">
                {agroparkContact.website}/politics
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold">3. Какие данные и с какой целью</h2>
            <p>
              Через формы бронирования и обратной связи обрабатываются имя, адрес электронной почты
              и текст сообщения. Цель обработки — обработка заявки или брони и связь с гостем. Данные
              не используются для иных целей и не передаются третьим лицам, кроме случаев,
              предусмотренных законодательством Российской Федерации.
            </p>

            <h2 id="pdn" className="scroll-mt-28 text-2xl font-bold">4. Согласие на обработку персональных данных</h2>
            <p>
              Отправляя форму, пользователь даёт согласие на обработку своих персональных данных в
              соответствии с 152-ФЗ. Согласие является добровольным и может быть отозвано в любой
              момент письмом на {agroparkContact.email}. В демонстрационной версии данные
              сохраняются только в браузере пользователя (localStorage) и не передаются на сервер.
            </p>

            <h2 className="text-2xl font-bold">5. Файлы cookie</h2>
            <p>
              Сайт использует технически необходимые файлы cookie для корректной работы. При первом
              визите показывается баннер согласия; нажатие кнопки «Принять» фиксирует согласие.
              Управлять cookie можно, очистив данные сайта в настройках браузера.
            </p>

            <h2 className="text-2xl font-bold">6. Хостинг</h2>
            <p>
              Демонстрационная версия размещена на платформе Vercel. Обрабатываются технически
              необходимые данные соединения, требующиеся для доставки страниц.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
