import { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';
import './GalleryPage.css';

const FALLBACK_IMAGES = [
  { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLeRjIfEFCEvoKv_9l3FF-I3IQyzKASZkvy5n_3_g-KsSkgBiCKF-2TrbwLY_7YvBOgB0H6dq1E3GD61PHZRKObV-SNvK_AE6g0RZqZwy-cPL94TCdWyyg02OAxBZqsYdmgMnouQfa-2Ow94dGiKNhtc_sLS1KMFehw1UzELodVICefmHuC3F3SBf-Cz9vkaLrvojci_Z1gjQaG5bXwiI-7Q2xLmgkdEKC18T9ZQYmzKb5F4xAorUshA", alt_text: "Intricate latte art in a ceramic cup on rustic wooden table" },
  { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuANwiS_AVkavtZ7KnsK23QuEny5tZ4nNukSk1PtyioT9wzsZDfi5Mingt_0z8pUnHMD-B_eBwBNkyr26RmGqhUTW4gkX-RsOgeoy-PcbDBbFK7Dc5ZWbAvzhPwNsVjsKwE7RRrZBDNGPW9IzBPAbeUBMcO4NbDAlA_iPlFQo6pmYWuIs2PQYLO566Yf_j6t-JzIhidPRPGW8MQur2o_X74bSIUnkVF_WUTr1duSHwTCATUo9_CK8j0_lA", alt_text: "Modern artisanal cafe interior with sunlight and plants" },
  { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZdTds9VRXnGYjOt1onYe7DVZkZ5sgQ-TDIYZxeabOrCW1Zj7DauPHQk4qgTilf7VSQj74Gl96jM5BCJWFQp_xhu6g_GjBqpxQOafalsYJb9qJHgsAWdIOsfQiAtM2SAf1e87CJ80tGr8lIu_6WKGJGdXZYZCJq-7fkcIxdOqq47M0KoQ8tng95f2xUw97XPn8JKs5hD8zPl0UfgcUFhYxAMON8DAWBiiYlgCZ3yUi2S93fZuMggVpQ", alt_text: "Layered espresso drink in clear glass with botanicals" },
  { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqsVtoR5PwMwzqbOXVwKMnryl7sf0gXE3QMdyqY_s5HBzfAuoUrVbKp6E6o8l7GTfih1cWOQT9BiRd-ERMMAr37JE6ytmhtyVHa5EpYLePUiXqOqsPK30aAHBiOYiqwERM2GTeNy0Ev-qhXOUBwF9mIwXBhTUFGlvlsgoaUSk7RADu_4WYH1qO7DWlA6_gGcmqLZc3_sN4IJieNSHzrrJeXahzZAZ3gOWnXOW_pgSzPlrzhNMoD0GSVw", alt_text: "Two customers in quiet conversation at a cafe table" },
  { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEcZ7flHxVkhAk4dkm-Ub79cdt8Kzhb46G5jhwvTQ9u8Ewa535f3DfrmPOnbM6ITmg58QT_KKdFqdBbuOcV37Qv5p7CP41F6yceUfR5iSEa4TMLKyFItKYY_hjQeY0vlWzBkYKq36bB0RhzjD672Pxi1vVxsR3E8qWFfh5dn8wi4X1vIu2JAq6Z8z5IgoeDVyGvk-enZxgtDBeR2lBqMdVHlCTTw5SK5U4AvyZeL5aSsqz3yB86lRcfQ", alt_text: "Barista hands pouring water over pour-over coffee setup" },
  { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHZZBTZZnmjLgEr5nP4z921WKVgm1upziCOg-KupoQ2GPqwJnUL1CQifxsYawAYr0xrf-aIHMuGnQZa-MlwzlSOo7PPWjb3WR5PSlP73VoVr5WDthvBEslaTU_o9ua5ePmSl-lPDQJYzToAZdJ3-vOjmN4yWdMDw2_zWAk9STqY_Kg8rhqe1VMZeZzm4ojRyYRVRVzpGvXSLgEU1fztIeC0YvpqTdCTxwY9vI3dpnT7dx-wuSuml64ag", alt_text: "Artisanal pastry on minimalist ceramic plate" },
  { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY8GduEiOy6sH76hc42MJgf19-Py-wXlseaoz2paPUnfQCGeGRk3iM-ERwZE27IJ5fQh1oFIInSw0eDMlq5RRvHBELssPusoB6R8ahMGDBjDdXzjrsUKdAY4BFGGNCfqIKMuXSbq5oRVsaeXFxxhkA9lUl85TkQgkvu5L24Op2TuSpUsNlhvzI_CrmtElT-6AdbLedJewyCM-fn-5XarbZlMS6Z7d92Gc2CvZbEZSDCcGjafO4GQrz7Q", alt_text: "Tranquil exterior view of cafe storefront in morning" },
];

export default function GalleryPage() {
  const [images, setImages] = useState(FALLBACK_IMAGES);

  useEffect(() => {
    fetchGallery().then((data) => {
      if (data && data.length > 0) setImages(data);
    });
  }, []);

  return (
    <div className="gallery-page">
      <header className="gallery-page__header animate-fade-in-up">
        <h1 className="display-lg-mobile gallery-page__title">Our Visual Story</h1>
        <p className="body-lg gallery-page__subtitle">
          Immerse yourself in the world of slow living and artisanal craftsmanship. A curated collection of moments captured in our sanctuary.
        </p>
      </header>

      <div className="masonry-grid stagger-children">
        {images.map((img, idx) => (
          <div className="masonry-item" key={idx}>
            <img
              src={img.image_url}
              alt={img.alt_text}
              className="gallery-page__img"
              loading="lazy"
            />
            <div className="image-overlay gallery-page__overlay">
              <span className="material-symbols-outlined gallery-page__zoom">zoom_in</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
