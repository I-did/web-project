<template>
  <div>
    <section class="hero">
      <div class="container hero__grid">
        <div class="hero__copy">
          <div class="eyebrow"><span class="eyebrow__line"></span> ТВОИ ЧЕТЫРЕ НЕДЕЛИ</div>
          <h1>Хорошая форма<br />начинается <em>с заботы</em><br />о себе.</h1>
          <p class="hero__description">
            Питание, подобранное под твои цели и привычки. Без сложных таблиц и бесконечных подсчётов — один понятный
            маршрут на 28 дней.
          </p>
          <div class="hero__actions">
            <RouterLink class="btn btn--primary" to="/payment">Начать марафон <span>↗</span></RouterLink
            ><RouterLink class="inline-link" to="/questionnaire">Посмотреть анкету <span>→</span></RouterLink>
          </div>
          <div class="hero__proof">
            <div class="avatar-stack"><span>М</span><span>А</span><span>+</span></div>
            <span>Небольшие шаги.<br /><strong>Заметная разница.</strong></span>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero-art">
            <div class="hero-art__sun"></div>
            <div class="hero-art__arch"></div>
            <div class="hero-art__shape"></div>
            <span class="hero-art__word">balance</span>
            <div class="hero-art__floating">
              <span>✳</span>
              <div><strong>28 дней</strong><small>для себя</small></div>
            </div>
          </div>
          <div class="hero-visual-label">НЕ ДИЕТА. НОВЫЙ РИТМ.</div>
        </div>
      </div>
    </section>
    <section class="features container">
      <div class="section-heading">
        <div class="eyebrow">КАК ЭТО РАБОТАЕТ</div>
        <h2>Всё нужное.<br /><em>Ничего лишнего.</em></h2>
      </div>
      <div class="feature-grid">
        <article class="feature-card">
          <span class="feature-number">01 /</span>
          <div class="feature-symbol">◎</div>
          <h3>Расскажи о себе</h3>
          <p>Небольшая анкета о целях, привычках и особенностях питания.</p>
        </article>
        <article class="feature-card">
          <span class="feature-number">02 /</span>
          <div class="feature-symbol">◒</div>
          <h3>Получи свой план</h3>
          <p>Рассчитаем КБЖУ и составим меню из готовой базы блюд.</p>
        </article>
        <article class="feature-card">
          <span class="feature-number">03 /</span>
          <div class="feature-symbol">✳</div>
          <h3>Двигайся в своём темпе</h3>
          <p>Четыре недели питания в одном удобном личном кабинете.</p>
        </article>
      </div>
    </section>
    <section class="bottom-cta container">
      <div>
        <span class="eyebrow">НАЧНИ СЕГОДНЯ</span>
        <h2>Удели время<br /><em>самому важному.</em></h2>
      </div>
      <RouterLink class="btn btn--light" to="/payment">Присоединиться <span>↗</span></RouterLink>
    </section>
  </div>
</template>
