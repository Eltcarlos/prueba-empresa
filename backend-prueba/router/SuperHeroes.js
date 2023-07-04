const { Router } = require("express");
const superHeroes = require("../controllers/superHeroes");

const router = Router();

router.post("/create", superHeroes.createHero);
router.get("/getheroes", superHeroes.getHeroes);
router.get("/heroes", superHeroes.searchHero);
router.get("/hero/:id", superHeroes.getHeroById);
router.delete("/delete/:id", superHeroes.deleteHero);
router.put("/update/:id", superHeroes.updateHero);

module.exports = router;
