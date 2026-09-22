import { useState, useEffect } from 'react';
import { fetchMenu } from '../services/api';
import './MenuPage.css';

// Fallback menu data
const FALLBACK_MENU = [
  {
    name: "Espresso", description: "A concentrated double shot of our signature house blend, featuring notes of dark chocolate and toasted almond.", price: 3.50, category: "coffee",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq9vSjXBqCFDJxDNYHZBTMSFw3PxDCH-Lyedwwj6bHJGO_fav_3jirzn7asKC1swZUh_llbQYkJlhmuH_B9IDJwBOr-StROrCtph5g3yejHYAvBqsgs93v_Ta7-In8IB2DHpKhdrcXZlV_tilbGR1-HHhtXFwZ571NBpS88u69PJAqNoDhGiiivyn-kX0U2_K79w9Q8xdlk3-pBOpZH_ig4grWcxe5Stybio0LCN0mbmR4jCD6JI1wiw",
  },
  {
    name: "Latte", description: "Silky steamed milk poured over rich espresso, creating a smooth, balanced texture with delicate latte art.", price: 4.75, category: "coffee",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMe27DUgEL5JFX4qfInoH-Od_onTNhb0BlR5lXrKjhE8umY2JpS2Rc8ZdidamCLZBbJDaez60VheU3MVtEo506TYaWkB53Zc70LJIr5kLHAM540pkMfLaP5jgaiZEA8BXxBnm5HZyIBrsvvkxVc3upbRF6WNYh2xWi5JEjPIcptwV4M4xVHVKQTvKq3YkFCk8l-elSZS8xvemRwYOw3odsptvshKg6V9fphy9Q29QlfKRbEtcqElXlTg",
  },
  {
    name: "Cappuccino", description: "Equal parts espresso, steamed milk, and dense microfoam, offering a robust coffee flavor and luxurious mouthfeel.", price: 4.50, category: "coffee",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3uHKc_5h8YV8sjXyvtaKEHvoeYWKWPxGJCwwjv5a5W_d5yPajfIfrnq8awAfW0Ruc7-PAVR-OhuQ-3xJw35EeZMjkWoD7IBSCx1JFkXwjQcSm-HVrCNfyNjIcRiwO51NeW8O91nvMU8T_I2O4-N5G-VDK9o80ZPLUeRFG9CVmrWuxk0BqqZ7EvDPMXNhx0HxheRAg78u-jlAmpSgQvRy-0XYa_Dfda2guiOinEHAdbco281njXHcAwA",
  },
  {
    name: "Classic Cold Brew", description: "Steeped for 18 hours to extract a remarkably smooth, low-acidity profile with subtle fruity undertones.", price: 5.00, category: "cold_brews",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD__0g7UAGbensXK5ZpPCV2QQWnEvhwTnnW0QXg7HjkQOqP8WMKJJ-6K3hFGbHuiFux6tzC0Ec2_LyPorDPwHjH09Jv4Px-MkBFWqmdnSgcG3ykhg-kGkHR4EvudIjAF706KTGhPLbCPi2Fm9DBBYizeAH9wEZcesDtT223Hvvoyqe-zqppUc2AHm-zijP9NOV1GnSlQy9RUUA8Ik_LfXHyx_6DEyryiLxLarBvYBrNb2xpYasVOr5uTQ",
  },
  {
    name: "Nitro Cold Brew", description: "Infused with nitrogen for a velvety, creamy texture and a cascading visual effect. Served chilled without ice.", price: 6.00, category: "cold_brews",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwS3Mno5-p9i6Lm1SV_Ds7JVt6qiBD15zOq5-mj1DPSGoWpcbqj1i3loLbsrsFgzPddlHfiXkWYTQjw2gEOjtDipGByV7UV4nVWlmCdn6K_JByx1DFVv8Etim5hcNdm8MfrDKSkiws-CIgOzMrabl6lGn9xmAC7kf1hYbQuuD0TqdgxbSW-1A9Qw0bAnhsframRqeICR_n5ryXBOiqrqodSyhn7R-fg4AsOFg8ejwRrGsAP0ACWWrMAA",
  },
  {
    name: "Butter Croissant", description: "A classic French pastry, baked fresh daily. Incredibly flaky on the outside with a soft, buttery honeycomb interior.", price: 4.00, category: "pastries",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiI4vNgFuzW-bpMmLEZz33vYRjEaDWNpCfprF4R3mDXnuoCSOHyLHsLqRt2V_U38_uXk3Heg9Xskzh0mwzIcMEt1exat9kvNWKm4XOimHlWWB2Qxix9qexYN8V_9UgD5X9iVVDXkPNTnW01rQ6MAYnILLfCZjSml8_W4lLtvGuk5STJErqXVybtSq1IT1lUUH5qB94KYQAJVqCyzIbDB2dS1D0l2XGKR_kODCaZGZAhEJLU-JnbHfu7g",
  },
  {
    name: "Blueberry Muffin", description: "Bursting with wild blueberries and topped with a delicate streusel crumb for a perfect textural contrast.", price: 3.75, category: "pastries",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuArGF3RVhrJA7C_fFl_5zc8NyI2ix9lDkCctC8l4tSWbxGyWFGgwfJ2WwRGBP1MDI_DdSfl-Vd-QSM61v36CMahaTSGuelzUmQ74ks3OnQZrXMBOLyEZ7GIOvtY69XCCQnOFrdLZ7Kaogdsi79_IVV3LEEDlxBqQubXbRDK5cdw0_yuOisUXCXeGDPu2zHtzFTyAT8_rUIUAMuJMMxTtmdQGgqEZ3crEKvoWG25fk4aSFcP5PNtSQNXpw",
  },
  {
    name: "Avocado Toast", description: "Smashed Hass avocado on thick-cut toasted sourdough, finished with micro cilantro, olive oil, and a sprinkle of sea salt.", price: 12.00, category: "breakfast",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcoP36Ai0T7TtXpmMM0OHhE0xSeY0YrUJgx4-4PFRnvpUQjlFQG8w1-AcqqupUdZhx7usC6hHqQad4cgLsGQPGUQR1wHDv80-glMAvfhoOiolm_r5KpMBojv7hqLAfRY38c1GqLG8Ej_5-TmUpctt0wir99U55Zi0Xm1VMf60uM6_ZpEz_Jc0QtOFo_LyGgMM6mmDpW0g4Dx_voiU-nmIVy_32ZhRvSs_PZhVnI5be0194sJwR5AIImw",
  },
  {
    name: "Savory Quiche", description: "A rich, creamy egg custard baked in a buttery crust with gruyere cheese, spinach, and caramelized onions. Served warm.", price: 9.50, category: "breakfast",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC00jPA6TF66VyTSuFgzWsvc9qflPGsTb4vDfp7VyT3otz9qZawk-Odtc1ziNHKhEg1GDfTgdFWiLJ6tNlLsReMLaYVuOFbdDD64YWR-8nLwY7wT1gZI0UToCUkCcLQ52eXI3FO8_D14g4Z_i-phF_PjlEQZZaJB-LHBMrmmaDP1YfWflYO8zzBNP7a4gvjxyiomydzZgxImmlyeI6doPtBv7RcxVbkJZtV5wSwUB3ze9nVVOAiTbxIpQ",
  },
];

const CATEGORIES = [
  { key: 'coffee', label: 'Coffee' },
  { key: 'cold_brews', label: 'Cold Brews' },
  { key: 'pastries', label: 'Pastries' },
  { key: 'breakfast', label: 'Breakfast' },
];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState(FALLBACK_MENU);

  useEffect(() => {
    fetchMenu().then((items) => {
      if (items) setMenuItems(items);
    });
  }, []);

  const getItemsByCategory = (category) =>
    menuItems.filter((item) => item.category === category);

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-page__header animate-fade-in-up">
        <h1 className="display-lg-mobile menu-page__title">Our Menu</h1>
        <p className="body-lg menu-page__subtitle">
          Crafted with care, featuring locally sourced ingredients and single-origin beans. Experience the art of slow living with every bite and sip.
        </p>
      </div>

      {/* Categories */}
      {CATEGORIES.map(({ key, label }) => {
        const items = getItemsByCategory(key);
        if (items.length === 0) return null;
        return (
          <section className="menu-page__section" key={key}>
            <h2 className="headline-md menu-page__category-title">{label}</h2>
            <div className="menu-page__grid stagger-children">
              {items.map((item, idx) => (
                <div className="menu-card menu-page__card" key={idx}>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="menu-page__card-image"
                    loading="lazy"
                  />
                  <div className="menu-page__card-body">
                    <div className="menu-page__card-header">
                      <h3 className="headline-sm menu-page__card-name">{item.name}</h3>
                      <span className="label-md menu-page__card-price">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="body-md menu-page__card-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Order Online Banner */}
      <section className="menu-page__banner">
        <div className="menu-page__banner-decor">
          <span className="material-symbols-filled" style={{ fontSize: '300px' }}>local_florist</span>
        </div>
        <h2 className="headline-md menu-page__banner-title">Bring Brew &amp; Bloom Home</h2>
        <p className="body-lg menu-page__banner-text">
          Skip the line and order your favorites ahead of time. Pick up in-store or choose contactless delivery.
        </p>
        <button className="btn-primary menu-page__banner-btn">Order Online Now</button>
      </section>
    </div>
  );
}
