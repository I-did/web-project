<template>
  <div class="container home-page">
    <section class="hero">
      <h1>КБЖУ — план питания на 4 недели</h1>
      <p>
        Сервис помогает рассчитать суточную норму калорий, белков, жиров и углеводов и получить план питания по вашим
        данным.
      </p>
      <div class="hero__actions">
        <RouterLink to="/payment" class="btn btn--primary">Оформить участие</RouterLink>
        <RouterLink to="/questionnaire" class="btn btn--secondary">Перейти к анкете</RouterLink>
      </div>
    </section>
    <section class="features">
      <h2>Как это работает</h2>
      <div class="feature-grid">
        <article class="feature-card">
          <h3>1. Анкета</h3>
          <p>Укажите цель, параметры тела, активность и пищевые ограничения.</p>
        </article>
        <article class="feature-card">
          <h3>2. Расчёт</h3>
          <p>Сервер рассчитывает КБЖУ по ответам анкеты.</p>
        </article>
        <article class="feature-card">
          <h3>3. План питания</h3>
          <p>В личном кабинете будет доступен план на четыре недели.</p>
        </article>
      </div>
    </section>
  </div>
</template>
