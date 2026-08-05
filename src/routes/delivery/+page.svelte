<script>
  import { m } from '$lib/paraglide/messages.js';
</script>

<section class="hero">
  <div class="container">
    <span class="eyebrow">{m.delivery_eyebrow()}</span>
    <h1>{m.delivery_hero_title()}</h1>
    <p>{m.delivery_hero_subtitle()}</p>
  </div>
</section>

<div class="content">
  <div class="container">

    <div class="ls">
      <h2>{m.delivery_where_title()}</h2>
      <div class="highlight">
        <p><strong>{m.delivery_where_highlight_strong()}</strong> {m.delivery_where_highlight_text()} <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a> {m.delivery_where_highlight_text2()}</p>
      </div>
      <p>{m.delivery_where_postcode()}</p>
    </div>

    <div class="ls">
      <h2>{m.delivery_days_title()}</h2>
      <h3>{m.delivery_day_subtitle()}</h3>
      <p>{m.delivery_day_text()} <strong>{m.delivery_saturdays()}</strong>. {m.delivery_day_frequency()}</p>
      <h3>{m.delivery_window_subtitle()}</h3>
      <p>{m.delivery_window_text()}</p>
    </div>

    <div class="ls">
      <h2>{m.delivery_fresh_title()}</h2>
      <div class="cold-panel">
        <h3>{m.delivery_cold_chain_subtitle()}</h3>
        <p>{m.delivery_cold_chain_text1()}</p>
        <p>{m.delivery_cold_chain_text2()}</p>
      </div>
    </div>

    <div class="ls">
      <h2>{m.delivery_not_home_title()}</h2>
      <p>{m.delivery_driver_intro()}</p>
      <ul>
        <li>{m.delivery_driver_item1()}</li>
        <li>{m.delivery_driver_item2()}</li>
        <li>{m.delivery_driver_item3()}</li>
      </ul>
      <p>{m.delivery_not_home_note()}</p>
    </div>

    <div class="ls">
      <h2>{m.delivery_cutoff_title()}</h2>
      <p>{m.delivery_cutoff_intro()}</p>
      <div class="infobox">
        <p>
          <strong>{m.delivery_cutoff_label()}</strong> {m.delivery_cutoff_text()}<br />
          {m.delivery_cutoff_example()}<br />
          {m.delivery_cutoff_account_note()}
        </p>
      </div>
    </div>

    <div class="ls">
      <h2>{m.delivery_address_title()}</h2>
      <ul>
        <li>{m.delivery_address_item1()}</li>
        <li>{m.delivery_address_item2()}</li>
        <li>{m.delivery_address_item3()}</li>
        <li>{m.delivery_address_item4()}</li>
      </ul>
      <p>{m.delivery_address_moving()} <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>.</p>
    </div>

    <div class="ls">
      <h2>{m.delivery_not_arrived_title()}</h2>
      <p>{m.delivery_not_arrived_intro()}</p>
      <ul>
        <li>{m.delivery_not_arrived_item1()}</li>
        <li>{m.delivery_not_arrived_item2()}</li>
        <li>{m.delivery_not_arrived_item3()}</li>
      </ul>
      <p>{m.delivery_not_arrived_contact()}</p>
      <div class="infobox">
        <p>
          <strong>{m.delivery_email_label()}</strong> <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a><br />
          <strong>{m.delivery_response_time_label()}</strong> {m.delivery_response_time_text()}
        </p>
      </div>
      <p>{m.delivery_lost_orders()}</p>
      <a href="/subscribe" class="btn">{m.delivery_start_subscription()}</a>
    </div>

  </div>
</div>

<style>
  a { color: var(--copper); text-decoration: none; }
  a:hover { text-decoration: underline; }

  .eyebrow { 
    display: block; 
    margin-bottom: 10px; 
    font-size: .7rem; 
    font-weight: 500; 
    letter-spacing: .18em; 
    text-transform: uppercase; 
    color: var(--copper); 
  }

  .hero { 
    padding: 60px 0 40px; 
    border-bottom: 1px solid var(--border); 
    background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%); 
    max-width: 1200px;  
    margin: 0 auto;
  }
  .hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-style: italic; margin-bottom: 8px; }
  .hero p { font-size: .9rem; color: var(--taupe); max-width: 480px; }

  .content { padding: 56px 0 88px; max-width: 1200px; margin: 0 auto; }
  
  .ls { margin-bottom: 44px; }
  .ls h2 { font-size: 1.45rem; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
  .ls h3 { font-size: 1.1rem; margin-bottom: 8px; margin-top: 20px; }
  .ls p { margin-bottom: 12px; font-size: .92rem; line-height: 1.8; color: #433e39; }
  .ls p:last-child { margin-bottom: 0; }
  .ls ul { margin: 10px 0 12px 18px; display: grid; gap: 7px; }
  .ls li { font-size: .9rem; line-height: 1.7; color: #433e39; }

  .infobox { background: #fff; border: 1px solid var(--border); padding: 18px 20px; margin: 16px 0; }
  .infobox p { margin: 0; font-size: .88rem; line-height: 1.7; }

  .highlight { background: rgba(181, 98, 42, .05); border: 1px solid rgba(181, 98, 42, .16); padding: 16px 20px; margin: 16px 0; }
  .highlight p { margin: 0; font-size: .88rem; line-height: 1.7; }

  .cold-panel { background: var(--panel); border: 1px solid var(--border); padding: 24px; margin: 16px 0; }
  .cold-panel h3 { font-size: 1.1rem; margin-bottom: 10px; }
  .cold-panel p { font-size: .9rem; color: var(--taupe); margin-bottom: 10px; }
  .cold-panel p:last-child { margin-bottom: 0; }

  .btn { 
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    min-height: 44px; 
    padding: 0 20px; 
    border-radius: 2px; 
    font-size: .7rem; 
    letter-spacing: .12em; 
    text-transform: uppercase; 
    font-weight: 500; 
    background: var(--copper); 
    color: #fff; 
    border: 1px solid var(--copper); 
    transition: all .15s; 
    margin-top: 10px; 
    text-decoration: none;
  }
  .btn:hover { background: #9a4f22; border-color: #9a4f22; text-decoration: none; }
</style>