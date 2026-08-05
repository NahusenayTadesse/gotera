<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
</script>

<section class="hero">
  <div class="container">
    <span class="eyebrow">{m.acctdelivery_eyebrow()}</span>
    <h1>{m.acctdelivery_title()}</h1>
    <p>{m.acctdelivery_subtitle()}</p>
  </div>
</section>

<div class="content">
  <div class="container">

    <div class="ls">
      <h2>{m.acctdelivery_where_heading()}</h2>
      <div class="highlight">
        <p><strong>{m.acctdelivery_london_only()}</strong> {m.acctdelivery_expanding_pre()} <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a> {m.acctdelivery_expanding_post()}</p>
      </div>
      <p>{m.acctdelivery_postcode_unsure()}</p>
    </div>

    <div class="ls">
      <h2>{m.acctdelivery_days_windows_heading()}</h2>
      <h3>{m.acctdelivery_day_heading()}</h3>
      <p>{m.acctdelivery_day_pre()} <strong>{m.acctdelivery_day_strong()}</strong>{m.acctdelivery_day_post()}</p>
      <h3>{m.acctdelivery_window_heading()}</h3>
      <p>{m.acctdelivery_window_text()}</p>
    </div>

    <div class="ls">
      <h2>{m.acctdelivery_fresh_heading()}</h2>
      <div class="cold-panel">
        <h3>{m.acctdelivery_cold_chain_heading()}</h3>
        <p>{m.acctdelivery_cold_chain_p1()}</p>
        <p>{m.acctdelivery_cold_chain_p2()}</p>
      </div>
    </div>

    <div class="ls">
      <h2>{m.acctdelivery_not_home_heading()}</h2>
      <p>{m.acctdelivery_driver_will()}</p>
      <ul>
        <li>{m.acctdelivery_safe_place_li()}</li>
        <li>{m.acctdelivery_delivery_card_li()}</li>
        <li>{m.acctdelivery_contact_li()}</li>
      </ul>
      <p>{m.acctdelivery_temp_sensitive_note()}</p>
    </div>

    <div class="ls">
      <h2>{m.acctdelivery_cutoff_heading()}</h2>
      <p>{m.acctdelivery_cutoff_intro()}</p>
      <div class="infobox">
        <p>
          <strong>{m.acctdelivery_cutoff_strong()}</strong> {m.acctdelivery_cutoff_line1()}<br />
          {m.acctdelivery_cutoff_example()}<br />
          {m.acctdelivery_cutoff_shown()}
        </p>
      </div>
    </div>

    <div class="ls">
      <h2>{m.acctdelivery_changing_address_heading()}</h2>
      <ul>
        <li>{m.acctdelivery_change_addr_li1()}</li>
        <li>{m.acctdelivery_change_addr_li2()}</li>
        <li>{m.acctdelivery_change_addr_li3()}</li>
        <li>{m.acctdelivery_change_addr_li4()}</li>
      </ul>
      <p>{m.acctdelivery_moving_pre()} <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>.</p>
    </div>

    <div class="ls">
      <h2>{m.acctdelivery_not_arrived_heading()}</h2>
      <p>{m.acctdelivery_not_arrived_intro()}</p>
      <ul>
        <li>{m.acctdelivery_check_li1()}</li>
        <li>{m.acctdelivery_check_li2()}</li>
        <li>{m.acctdelivery_check_li3()}</li>
      </ul>
      <p>{m.acctdelivery_unresolved_intro()}</p>
      <div class="infobox">
        <p>
          <strong>{m.acctdelivery_email_label()}</strong> <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a><br />
          <strong>{m.acctdelivery_response_time_label()}</strong> {m.acctdelivery_response_time_value()}
        </p>
      </div>
      <p>{m.acctdelivery_lost_order_note()}</p>
      <a href="/subscribe" class="btn">{m.acctdelivery_start_subscription_btn()}</a>
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
  }
  .hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-style: italic; margin-bottom: 8px; }
  .hero p { font-size: .9rem; color: var(--taupe); max-width: 480px; }

  .content { padding: 56px 0 88px; }
  
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