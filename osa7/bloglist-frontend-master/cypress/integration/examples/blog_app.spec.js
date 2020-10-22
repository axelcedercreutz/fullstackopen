describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("login");
  });

  describe("Login", () => {
    beforeEach(() => {
      const user = {
        name: "Axel Cedercreutz",
        username: "axel_cedercreutz",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
    });
    it("succeeds with correct credentials", () => {
      cy.contains("login").click();
      cy.get("#username").type("axel_cedercreutz");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("Axel Cedercreutz logged in");
    });

    it("fails with wrong credentials", () => {
      cy.contains("login").click();
      cy.get("#username").type("axel_cedercreutz");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".error").should("contain", "username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });

  describe.only("when logged in", () => {
    beforeEach(() => {
      const user = {
        name: "Axel Cedercreutz",
        username: "axel_cedercreutz",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.login({ username: "axel_cedercreutz", password: "salainen" });
    });
    describe("and a blog exists", () => {
      beforeEach(() => {
        cy.createBlog({
          title: "another note cypress",
          author: "Axel Smith",
          blogUrl: "aced.com",
        });
      });
      it("A blog can be created", function () {
        cy.contains("Add blog").click();
        cy.get("#title").type("My first title");
        cy.get("#author").type("salainen");
        cy.get("#url").type("salainen");
        cy.contains("Create").click();
        cy.contains("My first title");
      });
      it("it can be liked", function () {
        cy.contains("another note cypress").contains("view").click();
        cy.contains("another note cypress").contains("like").click();
        cy.contains("1");
      });
      it("it can be deleted by correct user", function () {
        cy.contains("another note cypress").contains("view").click();
        cy.get("#delete-button").click();
        cy.get("html").should("not.contain", "another note cypress");
      });
    });
    describe("blogs are in correct order", () => {
      beforeEach(() => {
        cy.createBlog({
          title: "Massive likes",
          author: "Axel Smith",
          blogUrl: "aced.com",
        });
        cy.createBlog({
          title: "Second blog with no likes",
          author: "Axel Smith",
          blogUrl: "aced.com",
        });
      });

      it("blogs with different likes are rendered so that the one on top has more likes", () => {
        cy.contains("Massive likes").contains("view").click();
        cy.contains("Massive likes").contains("like").click();
        cy.contains("Second blog with no likes").contains("view").click();

        cy.getBlogs().then((res) => {
          res.body[0].likes > res.body[1].likes;
        });
      });
    });
  });
});
