const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors route
router.get("/", async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== "") {
        searchOptions.name = new RegExp(req.query.name, "i");
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render("authors/index", { authors: authors, searchOptions: req.query });
    } catch (e) {
        res.redirect("/");
    }
});

// New Author route
router.get("/new", async (req, res) => {
    res.render("authors/new", { author: new Author() });
});

// Create Author route
router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.name,
    });
    try {
        const newAuthor = await author.save();
        res.redirect("authors");
    } catch (e) {
        res.render("authors/new", {
            author: author,
            errorMessage: " Error creating author",
        });
    }
    // await author.save((err, newAuthor) => {
    //     if (err) {
    //         res.render("authors/new", {
    //             author: author,
    //             errorMessage: " Error creating author",
    //         });
    //     } else {
    //         res.redirect("authors");
    //     }
    // });
    // res.send(req.body.name);
});

module.exports = router;
