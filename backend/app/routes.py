"""API route handlers for Brew & Bloom."""

from fastapi import APIRouter, HTTPException
from .database import get_database
from .models import MenuItem, ContactMessage, NewsletterSubscription, GalleryImage, TodaysSpecial

router = APIRouter()


# ─── Menu Routes ───────────────────────────────────────────────

@router.get("/menu")
async def get_menu():
    """Get all menu items grouped by category."""
    db = get_database()
    if db is None:
        return {"items": get_default_menu()}

    items = await db.menu_items.find().to_list(100)
    if not items:
        return {"items": get_default_menu()}

    for item in items:
        item["_id"] = str(item["_id"])
    return {"items": items}


@router.get("/menu/{category}")
async def get_menu_by_category(category: str):
    """Get menu items by category."""
    db = get_database()
    if db is None:
        all_items = get_default_menu()
        filtered = [i for i in all_items if i["category"] == category]
        return {"items": filtered}

    items = await db.menu_items.find({"category": category}).to_list(50)
    for item in items:
        item["_id"] = str(item["_id"])
    return {"items": items}


# ─── Today's Special Routes ───────────────────────────────────

@router.get("/todays-special")
async def get_todays_special():
    """Get today's special items."""
    db = get_database()
    if db is None:
        return {"specials": get_default_specials()}

    specials = await db.todays_specials.find().sort("date", -1).to_list(5)
    if not specials:
        return {"specials": get_default_specials()}

    for s in specials:
        s["_id"] = str(s["_id"])
    return {"specials": specials}


# ─── Gallery Routes ───────────────────────────────────────────

@router.get("/gallery")
async def get_gallery():
    """Get all gallery images."""
    db = get_database()
    if db is None:
        return {"images": get_default_gallery()}

    images = await db.gallery.find().to_list(50)
    if not images:
        return {"images": get_default_gallery()}

    for img in images:
        img["_id"] = str(img["_id"])
    return {"images": images}


# ─── Contact Routes ───────────────────────────────────────────

@router.post("/contact")
async def submit_contact(message: ContactMessage):
    """Submit a contact form message."""
    db = get_database()
    if db is not None:
        await db.contact_messages.insert_one(message.model_dump())
    return {"success": True, "message": "Thank you for reaching out! We'll get back to you soon."}


# ─── Newsletter Routes ────────────────────────────────────────

@router.post("/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    """Subscribe to the newsletter."""
    db = get_database()
    if db is not None:
        existing = await db.newsletter.find_one({"email": subscription.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already subscribed")
        await db.newsletter.insert_one(subscription.model_dump())
    return {"success": True, "message": "Welcome to the Coffee Club!"}


# ─── Seed Data Route ──────────────────────────────────────────

@router.post("/seed")
async def seed_database():
    """Seed the database with default data."""
    db = get_database()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    # Clear existing data
    await db.menu_items.delete_many({})
    await db.todays_specials.delete_many({})
    await db.gallery.delete_many({})

    # Insert default data
    await db.menu_items.insert_many(get_default_menu())
    await db.todays_specials.insert_many(get_default_specials())
    await db.gallery.insert_many(get_default_gallery())

    return {"success": True, "message": "Database seeded successfully"}


# ─── Default Data ──────────────────────────────────────────────

def get_default_menu():
    """Return default menu items."""
    return [
        {
            "name": "Espresso",
            "description": "A concentrated double shot of our signature house blend, featuring notes of dark chocolate and toasted almond.",
            "price": 3.50,
            "category": "coffee",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDq9vSjXBqCFDJxDNYHZBTMSFw3PxDCH-Lyedwwj6bHJGO_fav_3jirzn7asKC1swZUh_llbQYkJlhmuH_B9IDJwBOr-StROrCtph5g3yejHYAvBqsgs93v_Ta7-In8IB2DHpKhdrcXZlV_tilbGR1-HHhtXFwZ571NBpS88u69PJAqNoDhGiiivyn-kX0U2_K79w9Q8xdlk3-pBOpZH_ig4grWcxe5Stybio0LCN0mbmR4jCD6JI1wiw",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Latte",
            "description": "Silky steamed milk poured over rich espresso, creating a smooth, balanced texture with delicate latte art.",
            "price": 4.75,
            "category": "coffee",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBMe27DUgEL5JFX4qfInoH-Od_onTNhb0BlR5lXrKjhE8umY2JpS2Rc8ZdidamCLZBbJDaez60VheU3MVtEo506TYaWkB53Zc70LJIr5kLHAM540pkMfLaP5jgaiZEA8BXxBnm5HZyIBrsvvkxVc3upbRF6WNYh2xWi5JEjPIcptwV4M4xVHVKQTvKq3YkFCk8l-elSZS8xvemRwYOw3odsptvshKg6V9fphy9Q29QlfKRbEtcqElXlTg",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Cappuccino",
            "description": "Equal parts espresso, steamed milk, and dense microfoam, offering a robust coffee flavor and luxurious mouthfeel.",
            "price": 4.50,
            "category": "coffee",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuA3uHKc_5h8YV8sjXyvtaKEHvoeYWKWPxGJCwwjv5a5W_d5yPajfIfrnq8awAfW0Ruc7-PAVR-OhuQ-3xJw35EeZMjkWoD7IBSCx1JFkXwjQcSm-HVrCNfyNjIcRiwO51NeW8O91nvMU8T_I2O4-N5G-VDK9o80ZPLUeRFG9CVmrWuxk0BqqZ7EvDPMXNhx0HxheRAg78u-jlAmpSgQvRy-0XYa_Dfda2guiOinEHAdbco281njXHcAwA",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Classic Cold Brew",
            "description": "Steeped for 18 hours to extract a remarkably smooth, low-acidity profile with subtle fruity undertones.",
            "price": 5.00,
            "category": "cold_brews",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuD__0g7UAGbensXK5ZpPCV2QQWnEvhwTnnW0QXg7HjkQOqP8WMKJJ-6K3hFGbHuiFux6tzC0Ec2_LyPorDPwHjH09Jv4Px-MkBFWqmdnSgcG3ykhg-kGkHR4EvudIjAF706KTGhPLbCPi2Fm9DBBYizeAH9wEZcesDtT223Hvvoyqe-zqppUc2AHm-zijP9NOV1GnSlQy9RUUA8Ik_LfXHyx_6DEyryiLxLarBvYBrNb2xpYasVOr5uTQ",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Nitro Cold Brew",
            "description": "Infused with nitrogen for a velvety, creamy texture and a cascading visual effect. Served chilled without ice.",
            "price": 6.00,
            "category": "cold_brews",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAwS3Mno5-p9i6Lm1SV_Ds7JVt6qiBD15zOq5-mj1DPSGoWpcbqj1i3loLbsrsFgzPddlHfiXkWYTQjw2gEOjtDipGByV7UV4nVWlmCdn6K_JByx1DFVv8Etim5hcNdm8MfrDKSkiws-CIgOzMrabl6lGn9xmAC7kf1hYbQuuD0TqdgxbSW-1A9Qw0bAnhsframRqeICR_n5ryXBOiqrqodSyhn7R-fg4AsOFg8ejwRrGsAP0ACWWrMAA",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Butter Croissant",
            "description": "A classic French pastry, baked fresh daily. Incredibly flaky on the outside with a soft, buttery honeycomb interior.",
            "price": 4.00,
            "category": "pastries",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBiI4vNgFuzW-bpMmLEZz33vYRjEaDWNpCfprF4R3mDXnuoCSOHyLHsLqRt2V_U38_uXk3Heg9Xskzh0mwzIcMEt1exat9kvNWKm4XOimHlWWB2Qxix9qexYN8V_9UgD5X9iVVDXkPNTnW01rQ6MAYnILLfCZjSml8_W4lLtvGuk5STJErqXVybtSq1IT1lUUH5qB94KYQAJVqCyzIbDB2dS1D0l2XGKR_kODCaZGZAhEJLU-JnbHfu7g",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Blueberry Muffin",
            "description": "Bursting with wild blueberries and topped with a delicate streusel crumb for a perfect textural contrast.",
            "price": 3.75,
            "category": "pastries",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuArGF3RVhrJA7C_fFl_5zc8NyI2ix9lDkCctC8l4tSWbxGyWFGgwfJ2WwRGBP1MDI_DdSfl-Vd-QSM61v36CMahaTSGuelzUmQ74ks3OnQZrXMBOLyEZ7GIOvtY69XCCQnOFrdLZ7Kaogdsi79_IVV3LEEDlxBqQubXbRDK5cdw0_yuOisUXCXeGDPu2zHtzFTyAT8_rUIUAMuJMMxTtmdQGgqEZ3crEKvoWG25fk4aSFcP5PNtSQNXpw",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Avocado Toast",
            "description": "Smashed Hass avocado on thick-cut toasted sourdough, finished with micro cilantro, olive oil, and a sprinkle of sea salt.",
            "price": 12.00,
            "category": "breakfast",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDcoP36Ai0T7TtXpmMM0OHhE0xSeY0YrUJgx4-4PFRnvpUQjlFQG8w1-AcqqupUdZhx7usC6hHqQad4cgLsGQPGUQR1wHDv80-glMAvfhoOiolm_r5KpMBojv7hqLAfRY38c1GqLG8Ej_5-TmUpctt0wir99U55Zi0Xm1VMf60uM6_ZpEz_Jc0QtOFo_LyGgMM6mmDpW0g4Dx_voiU-nmIVy_32ZhRvSs_PZhVnI5be0194sJwR5AIImw",
            "is_available": True,
            "tags": []
        },
        {
            "name": "Savory Quiche",
            "description": "A rich, creamy egg custard baked in a buttery crust with gruyere cheese, spinach, and caramelized onions. Served warm.",
            "price": 9.50,
            "category": "breakfast",
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuC00jPA6TF66VyTSuFgzWsvc9qflPGsTb4vDfp7VyT3otz9qZawk-Odtc1ziNHKhEg1GDfTgdFWiLJ6tNlLsReMLaYVuOFbdDD64YWR-8nLwY7wT1gZI0UToCUkCcLQ52eXI3FO8_D14g4Z_i-phF_PjlEQZZaJB-LHBMrmmaDP1YfWflYO8zzBNP7a4gvjxyiomydzZgxImmlyeI6doPtBv7RcxVbkJZtV5wSwUB3ze9nVVOAiTbxIpQ",
            "is_available": True,
            "tags": []
        },
    ]


def get_default_specials():
    """Return default today's specials."""
    return [
        {
            "name": "Maple Pecan Latte",
            "description": "Embrace the season with our handcrafted signature latte. We blend our ethically sourced, medium-roast house espresso with velvety steamed oat milk, real Vermont maple syrup, and a house-made toasted pecan purée. Finished with a dusting of cinnamon.",
            "price": 6.50,
            "original_price": None,
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCCUWMOKQ7vFzvUxhkE6RAA1AAZYFI7me7ZE1le2cRRWpOLopQs3-wIzXooaBDU8Y6GOz8nGhQPk_uuxjEr_HBlZrZtZEg-1H9gFJrjhQEifjFFxPzENr4fvLNhlEdALvZBYUOqBVZP4CLAqJ2VgOvXg_hXUuGPXSl0wwY_x_1Nq7KomBXnMtxQipFEPpBIHi8fDkyNIj493RU9VSBJvtC2eaxv1f-tkRg9pVeZCQI4pQklnT70Be0Srg",
            "available_until": "6 PM",
        },
        {
            "name": "Lavender Earl Grey Scone",
            "description": "Delicate, crumbly scones infused with organic Earl Grey tea and local lavender. Served warm.",
            "price": 4.25,
            "original_price": None,
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBbL7QGUgEVE2B0HJyQNhmj_5wT6fuvYbBakKzXTIfYTfxYMEek_iIDmM2oJUlMmyCtlu8QfllW2RyVt-bzYLi3QQysxz-NstjSd8SgLAOaNxzXqqyoDkEeYuR150cm3Uo2lnoXlp5ld8ANSOf81rA-XQ9xWRVezGI9TSTa-5pA9drYIFxo3NbiUybmSXYSH2_zEcZMj4OrIy7dvQ7GaJlSJQLNWAkt6fluK4OJUV1IYEs9qxftV8UYNQ",
            "available_until": "6 PM",
        },
        {
            "name": "Yuzu Matcha Lemonade",
            "description": "Ceremonial grade matcha layered over tart, refreshing yuzu lemonade. A perfect afternoon pick-me-up.",
            "price": 5.50,
            "original_price": None,
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDdGNuZwFXvZgstcvf2SIJuo2XGpFQSjBTypVQgqXexsg7fX4-IaeUMlk8AXkiVBEG_5gEs3qLNQzb_hQJeYXN1viHQShOB_6WYX8YRbHQ-AmlH2tSG-ZprVOawSOovnoDY94aUJ4IjhtqOBUwQAvvLZZn2g3QoUIk9CFJORXTE72m0-_t26mMlRuyUhMKZspRHxrayvsqijHTuPiKd07mEyEkrrj6tbB_LcW2CgnVFwcjkXs-2rQZ5ZA",
            "available_until": "6 PM",
        },
    ]


def get_default_gallery():
    """Return default gallery images."""
    return [
        {
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBLeRjIfEFCEvoKv_9l3FF-I3IQyzKASZkvy5n_3_g-KsSkgBiCKF-2TrbwLY_7YvBOgB0H6dq1E3GD61PHZRKObV-SNvK_AE6g0RZqZwy-cPL94TCdWyyg02OAxBZqsYdmgMnouQfa-2Ow94dGiKNhtc_sLS1KMFehw1UzELodVICefmHuC3F3SBf-Cz9vkaLrvojci_Z1gjQaG5bXwiI-7Q2xLmgkdEKC18T9ZQYmzKb5F4xAorUshA",
            "alt_text": "Intricate latte art in a ceramic cup on rustic wooden table",
            "category": "coffee",
        },
        {
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuANwiS_AVkavtZ7KnsK23QuEny5tZ4nNukSk1PtyioT9wzsZDfi5Mingt_0z8pUnHMD-B_eBwBNkyr26RmGqhUTW4gkX-RsOgeoy-PcbDBbFK7Dc5ZWbAvzhPwNsVjsKwE7RRrZBDNGPW9IzBPAbeUBMcO4NbDAlA_iPlFQo6pmYWuIs2PQYLO566Yf_j6t-JzIhidPRPGW8MQur2o_X74bSIUnkVF_WUTr1duSHwTCATUo9_CK8j0_lA",
            "alt_text": "Modern artisanal cafe interior with sunlight and plants",
            "category": "interior",
        },
        {
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZdTds9VRXnGYjOt1onYe7DVZkZ5sgQ-TDIYZxeabOrCW1Zj7DauPHQk4qgTilf7VSQj74Gl96jM5BCJWFQp_xhu6g_GjBqpxQOafalsYJb9qJHgsAWdIOsfQiAtM2SAf1e87CJ80tGr8lIu_6WKGJGdXZYZCJq-7fkcIxdOqq47M0KoQ8tng95f2xUw97XPn8JKs5hD8zPl0UfgcUFhYxAMON8DAWBiiYlgCZ3yUi2S93fZuMggVpQ",
            "alt_text": "Layered espresso drink in clear glass with botanicals",
            "category": "coffee",
        },
        {
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDqsVtoR5PwMwzqbOXVwKMnryl7sf0gXE3QMdyqY_s5HBzfAuoUrVbKp6E6o8l7GTfih1cWOQT9BiRd-ERMMAr37JE6ytmhtyVHa5EpYLePUiXqOqsPK30aAHBiOYiqwERM2GTeNy0Ev-qhXOUBwF9mIwXBhTUFGlvlsgoaUSk7RADu_4WYH1qO7DWlA6_gGcmqLZc3_sN4IJieNSHzrrJeXahzZAZ3gOWnXOW_pgSzPlrzhNMoD0GSVw",
            "alt_text": "Two customers in quiet conversation at a cafe table",
            "category": "people",
        },
        {
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDEcZ7flHxVkhAk4dkm-Ub79cdt8Kzhb46G5jhwvTQ9u8Ewa535f3DfrmPOnbM6ITmg58QT_KKdFqdBbuOcV37Qv5p7CP41F6yceUfR5iSEa4TMLKyFItKYY_hjQeY0vlWzBkYKq36bB0RhzjD672Pxi1vVxsR3E8qWFfh5dn8wi4X1vIu2JAq6Z8z5IgoeDVyGvk-enZxgtDBeR2lBqMdVHlCTTw5SK5U4AvyZeL5aSsqz3yB86lRcfQ",
            "alt_text": "Barista hands pouring water over pour-over coffee setup",
            "category": "coffee",
        },
        {
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAHZZBTZZnmjLgEr5nP4z921WKVgm1upziCOg-KupoQ2GPqwJnUL1CQifxsYawAYr0xrf-aIHMuGnQZa-MlwzlSOo7PPWjb3WR5PSlP73VoVr5WDthvBEslaTU_o9ua5ePmSl-lPDQJYzToAZdJ3-vOjmN4yWdMDw2_zWAk9STqY_Kg8rhqe1VMZeZzm4ojRyYRVRVzpGvXSLgEU1fztIeC0YvpqTdCTxwY9vI3dpnT7dx-wuSuml64ag",
            "alt_text": "Artisanal pastry on minimalist ceramic plate",
            "category": "food",
        },
        {
            "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDY8GduEiOy6sH76hc42MJgf19-Py-wXlseaoz2paPUnfQCGeGRk3iM-ERwZE27IJ5fQh1oFIInSw0eDMlq5RRvHBELssPusoB6R8ahMGDBjDdXzjrsUKdAY4BFGGNCfqIKMuXSbq5oRVsaeXFxxhkA9lUl85TkQgkvu5L24Op2TuSpUsNlhvzI_CrmtElT-6AdbLedJewyCM-fn-5XarbZlMS6Z7d92Gc2CvZbEZSDCcGjafO4GQrz7Q",
            "alt_text": "Tranquil exterior view of cafe storefront in morning",
            "category": "exterior",
        },
    ]
