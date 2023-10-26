var all, daily_play, found;
document.addEventListener("DOMContentLoaded", function () {
  var e = [].slice.call(document.querySelectorAll("img.lazyLoad"));
  if ("IntersectionObserver" in window) {
    let n = new IntersectionObserver(function (e, t) {
      e.forEach(function (t) {
        if (t.isIntersecting) {
          let e = t.target;
          (e.src = e.dataset.src),
            e.classList.remove("lazyLoad"),
            n.unobserve(e);
        }
      });
    });
    e.forEach(function (e) {
      n.observe(e);
    });
  }
});
var guess,
  points,
  rank1,
  rank2,
  rank3,
  rank4,
  rank5,
  rank6,
  rank7,
  rank8,
  rank9,
  replaying,
  total,
  todaytotal,
  yesterdaytotal,
  win,
  words,
  todaywords,
  yesterdaywords,
  dark,
  foundlist = [],
  letters = [],
  todayletters = [],
  wordlist = [],
  todaywordlist = [],
  yesterdaywordlist = [];
function darkmode() {
  for (var e = document.querySelectorAll("body"), t = 0; t < e.length; t++)
    "fg" != e[t].className &&
      "bg" != e[t].className &&
      (1 == dark
        ? ((e[t].style.background = "#fbfcff"),
          (e[t].style.color = "#243b4a"),
          (dark = 0),
          localStorage.setItem("useDarkMode", 1))
        : ((e[t].style.background = "#111111"),
          (e[t].style.color = "#9e9e9e"),
          (dark = 1),
          localStorage.setItem("useDarkMode", 0)));
}
function type(e, t) {
  (document.getElementById("no-message").style.display = "inline"),
    (document.getElementById("pangram").style.display = "none"),
    (document.getElementById("already-found").style.display = "none"),
    (document.getElementById("center-letter").style.display = "none"),
    (document.getElementById("too-short").style.display = "none"),
    (document.getElementById("not-in-list").style.display = "none"),
    (document.getElementById("comb" + t).style.height = "80px"),
    (document.getElementById("comb" + t).style.width = "80px"),
    (document.getElementById("comb" + t).style.left =
      parseInt(document.getElementById("comb" + t).style.left) + 10 + "px"),
    (document.getElementById("comb" + t).style.top =
      parseInt(document.getElementById("comb" + t).style.top) + 10 + "px"),
    (document.getElementById("guess").value =
      document.getElementById("guess").value + e);
}
function untype() {
  (document.getElementById("comb1").style.height = "100px"),
    (document.getElementById("comb1").style.width = "100px"),
    (document.getElementById("comb1").style.left = "1px"),
    (document.getElementById("comb1").style.top = "51px"),
    (document.getElementById("comb2").style.height = "100px"),
    (document.getElementById("comb2").style.width = "100px"),
    (document.getElementById("comb2").style.left = "80px"),
    (document.getElementById("comb2").style.top = "1px"),
    (document.getElementById("comb3").style.height = "100px"),
    (document.getElementById("comb3").style.width = "100px"),
    (document.getElementById("comb3").style.left = "159px"),
    (document.getElementById("comb3").style.top = "51px"),
    (document.getElementById("comb4").style.height = "100px"),
    (document.getElementById("comb4").style.width = "100px"),
    (document.getElementById("comb4").style.left = "1px"),
    (document.getElementById("comb4").style.top = "149px"),
    (document.getElementById("comb5").style.height = "100px"),
    (document.getElementById("comb5").style.width = "100px"),
    (document.getElementById("comb5").style.left = "80px"),
    (document.getElementById("comb5").style.top = "199px"),
    (document.getElementById("comb6").style.height = "100px"),
    (document.getElementById("comb6").style.width = "100px"),
    (document.getElementById("comb6").style.left = "159px"),
    (document.getElementById("comb6").style.top = "149px"),
    (document.getElementById("comb7").style.height = "100px"),
    (document.getElementById("comb7").style.width = "100px"),
    (document.getElementById("comb7").style.left = "80px"),
    (document.getElementById("comb7").style.top = "100px");
}
function doPlay(e, t, n, o, l) {
  (document.getElementById("play" + e).src = l[e - 1] + ".png"),
    (document.getElementById("play" + e).alt = l[e - 1]),
    (document.getElementById("play" + e).style.left = t + "px"),
    (document.getElementById("play" + e).style.top = n + "px"),
    (document.getElementById("play" + e).ontouchstart = function () {
      type(l[e - (o = 1)], e);
    }),
    (document.getElementById("play" + e).onmousedown = function () {
      1 != o && type(7 == e ? l[e - 1][1] : l[e - 1], e);
    }),
    (document.getElementById("play" + e).style.display = "block"),
    (document.getElementById("play" + e).onmouseup = function () {
      untype();
    }),
    (document.getElementById("play" + e).ondragend = function () {
      untype();
    }),
    (document.getElementById("play" + e).ontouchend = function () {
      untype();
    }),
    (document.getElementById("play" + e).ontouchcancel = function () {
      untype();
    });
}
function display() {
  doPlay(1, 21, 51, 0, letters),
    doPlay(2, 100, 1, 0, letters),
    doPlay(3, 179, 51, 0, letters),
    doPlay(4, 21, 149, 0, letters),
    doPlay(5, 100, 199, 0, letters),
    doPlay(6, 179, 149, 0, letters),
    doPlay(7, 100, 100, 0, letters);
}
function update_rank() {
  var e =
    rank9 <= points
      ? (0 == win &&
          (alert(
            "You earned the rank of Queen Bee!\n\nCan you find all the words?"
          ),
          (win = 1)),
        "Queen Bee!")
      : rank8 <= points
      ? "Outstanding"
      : rank7 <= points
      ? "Marvellous"
      : rank6 <= points
      ? "Superb"
      : rank5 <= points
      ? "Excellent"
      : rank4 <= points
      ? "Skilled"
      : rank3 <= points
      ? "Fine"
      : rank2 <= points
      ? "Novice"
      : "Newbie";
  document.getElementById("rank-update").innerHTML = e;
}
function set_rank() {
  (rank1 = 0),
    (rank2 = Math.floor(0.02 * total)),
    (rank3 = Math.floor(0.05 * total)),
    (rank4 = Math.floor(0.08 * total)),
    (rank5 = Math.floor(0.15 * total)),
    (rank6 = Math.floor(0.25 * total)),
    (rank7 = Math.floor(0.4 * total)),
    (rank8 = Math.floor(0.5 * total)),
    (rank9 = Math.floor(0.7 * total));
}
function save_word() {
  localStorage.setItem("foundwords", JSON.stringify(foundlist));
}
function add_points() {
  var e = 0,
    t = 0,
    n = 0,
    o = 0,
    l = 0,
    d = 0,
    s = 0,
    y = 0;
  if ((1 === daily_play && save_word(), (s = guess.length) < 7))
    return 4 == s && (s = 1), void (points += s);
  for (s = 0; s < guess.length; ) {
    for (y = 0; y < 7; y++)
      guess[s] == letters[y] &&
        (0 == y && (e = 1),
        1 == y && (t = 1),
        2 == y && (n = 1),
        3 == y && (o = 1),
        4 == y && (l = 1),
        5 == y && (d = 1));
    s += 1;
  }
  if (1 == e && 1 == t && 1 == n && 1 == o && 1 == l && 1 == d)
    return (
      (points = points + guess.length + 7),
      (document.getElementById("no-message").style.display = "none"),
      void (document.getElementById("pangram").style.display = "inline")
    );
  points += guess.length;
}
function found_word() {
  for (var e = 0; e < found; e++)
    if (guess == foundlist[e])
      return (
        (document.getElementById("no-message").style.display = "none"),
        (document.getElementById("already-found").style.display = "inline"),
        1
      );
  return (
    foundlist.push(guess),
    (found += 1),
    add_points(),
    (document.getElementById("points-update").innerHTML = points),
    (document.getElementById("answers-update").innerHTML =
      foundlist.join("<br />")),
    update_rank(),
    found == words &&
      (alert("Congratulations! You found all the words!"), (all = 1)),
    0
  );
}
function updateElements() {
  (document.getElementById("no-message").style.display = "inline"),
    (document.getElementById("pangram").style.display = "none"),
    (document.getElementById("already-found").style.display = "none"),
    (document.getElementById("center-letter").style.display = "none"),
    (document.getElementById("too-short").style.display = "none"),
    (document.getElementById("not-in-list").style.display = "none");
}
function check() {
  var e,
    t = 0;
  for (
    updateElements(),
      0 === replaying
        ? ((guess = document.getElementById("guess").value.toLowerCase()),
          document.getElementById("player-guess").reset())
        : (guess = guess.toLowerCase()),
      e = 0;
    e < guess.length;
    e++
  )
    "7" + guess[e] == letters[6] && (t = 1);
  if (guess.length < 4)
    return (
      (document.getElementById("no-message").style.display = "none"),
      (document.getElementById("too-short").style.display = "inline"),
      1
    );
  if (0 == t)
    return (
      (document.getElementById("no-message").style.display = "none"),
      (document.getElementById("center-letter").style.display = "inline"),
      1
    );
  for (e = 0; e < words; e++)
    if (guess == wordlist[e]) return (e = found_word());
  return (
    (document.getElementById("no-message").style.display = "none"),
    (document.getElementById("not-in-list").style.display = "inline"),
    1
  );
}
function replay_words() {
  var e, t;
  for (
    replaying = 1,
      t = JSON.parse(localStorage.getItem("foundwords")),
      localStorage.removeItem("foundwords"),
      e = 0;
    e < t.length;
    e++
  )
    if (((guess = t[e]), 1 == check())) {
      for (localStorage.removeItem("foundwords"), e = 0; e < found; e++)
        foundlist.pop();
      return (
        (rank = "Newbie"),
        (win = points = found = all = 0),
        updateElements(),
        void (replaying = 0)
      );
    }
  updateElements(), (replaying = 0);
}
function daily() {
  var e;
  for (daily_play = 1, e = 0; e < found; e++) foundlist.pop();
  (rank = "Newbie"),
    (win = replaying = points = found = all = 0),
    (document.getElementById("points-update").innerHTML = points),
    (document.getElementById("answers-update").innerHTML =
      foundlist.join("<br />")),
    (document.getElementById("rank-update").innerHTML = rank),
    (document.getElementById("yesterday-or-random").innerHTML =
      "Yesterday's answers"),
    (document.getElementById("random-answers").style.display = "none"),
    (document.getElementById("restart-daily-button").style.visibility =
      "hidden"),
    (document.getElementById("update-random").innerHTML = ""),
    updateElements(),
    (document.getElementById("play1").style.display = "none"),
    (document.getElementById("play2").style.display = "none"),
    (document.getElementById("play3").style.display = "none"),
    (document.getElementById("play4").style.display = "none"),
    (document.getElementById("play5").style.display = "none"),
    (document.getElementById("play6").style.display = "none"),
    (document.getElementById("play7").style.display = "none"),
    (letters[0] = todayletters[0]),
    (letters[1] = todayletters[1]),
    (letters[2] = todayletters[2]),
    (letters[3] = todayletters[3]),
    (letters[4] = todayletters[4]),
    (letters[5] = todayletters[5]),
    (letters[6] = todayletters[6]),
    (words = todaywords),
    (total = todaytotal),
    (wordlist = todaywordlist),
    set_rank(),
    !0 === localStorage.hasOwnProperty("foundwords") && replay_words(),
    (document.getElementById("update-random").innerHTML =
      yesterdaywordlist.join("<br />") +
      "<br /><br />Total words:  " +
      yesterdaywords +
      "<br />Total points: " +
      yesterdaytotal +
      "<br />Points for Queen Bee: " +
      Math.floor(0.7 * yesterdaytotal)),
    display();
}
function get_yesterday() {
  var e = new XMLHttpRequest();
  (e.onreadystatechange = function () {
    var e;
    4 == this.readyState &&
      200 == this.status &&
      ((e = JSON.parse(this.responseText)),
      (yesterdaywords = e.words),
      (yesterdaytotal = e.total),
      (yesterdaywordlist = e.wordlist));
  }),
    e.open("GET", "yesterday", !0),
    e.send();
}
function get_today() {
  var e = new XMLHttpRequest();
  (e.onreadystatechange = function () {
    var e;
    4 == this.readyState &&
      200 == this.status &&
      ((e = JSON.parse(this.responseText)),
      (todayletters[0] = e.letters[0]),
      (todayletters[1] = e.letters[1]),
      (todayletters[2] = e.letters[2]),
      (todayletters[3] = e.letters[3]),
      (todayletters[4] = e.letters[4]),
      (todayletters[5] = e.letters[5]),
      (todayletters[6] = "7" + e.center),
      (todaywords = e.words),
      (todaytotal = e.total),
      (todaywordlist = e.wordlist),
      daily());
  }),
    e.open("GET", "today", !0),
    e.send();
}
function shuffle() {
  for (var e, t, n = 5; 0 < n; n--)
    (e = Math.floor(Math.random() * (n + 1))),
      (t = letters[e]),
      (letters[e] = letters[n]),
      (letters[n] = t);
  display();
}
function random() {
  for (var e = new XMLHttpRequest(), t = (daily_play = 0); t < found; t++)
    foundlist.pop();
  (rank = "Newbie"),
    (win = points = found = all = 0),
    (document.getElementById("points-update").innerHTML = points),
    (document.getElementById("answers-update").innerHTML =
      foundlist.join("<br />")),
    (document.getElementById("rank-update").innerHTML = rank),
    (document.getElementById("yesterday-or-random").innerHTML = "Answers"),
    (document.getElementById("update-random").innerHTML = ""),
    updateElements(),
    (document.getElementById("play1").style.display = "none"),
    (document.getElementById("play2").style.display = "none"),
    (document.getElementById("play3").style.display = "none"),
    (document.getElementById("play4").style.display = "none"),
    (document.getElementById("play5").style.display = "none"),
    (document.getElementById("play6").style.display = "none"),
    (document.getElementById("play7").style.display = "none"),
    (e.onreadystatechange = function () {
      var e;
      4 == this.readyState &&
        200 == this.status &&
        ((e = JSON.parse(this.responseText)),
        (letters[0] = e.letters[0]),
        (letters[1] = e.letters[1]),
        (letters[2] = e.letters[2]),
        (letters[3] = e.letters[3]),
        (letters[4] = e.letters[4]),
        (letters[5] = e.letters[5]),
        (letters[6] = "7" + e.center),
        (words = e.words),
        (total = e.total),
        (wordlist = e.wordlist),
        set_rank(),
        display(),
        (document.getElementById("random-answers").style.display = "block"),
        (document.getElementById("restart-daily-button").style.visibility =
          "visible"));
    }),
    e.open("GET", "../../cgi-bin/random", !0),
    e.send();
}
function show_random() {
  document.getElementById("update-random").innerHTML =
    wordlist.join("<br />") +
    "<br /><br />Total words:  " +
    words +
    "<br />Total points: " +
    total +
    "<br />Points for Queen Bee: " +
    Math.floor(0.7 * total);
}
function delete_letter() {
  var e = (t = document.getElementById("guess").value).length,
    t = t.slice(0, e - 1) + t.slice(e, e);
  document.getElementById("guess").value = t;
}
window.onload = function () {
  (document.getElementById("comb1").style.height = "100px"),
    (document.getElementById("comb1").style.width = "100px"),
    (document.getElementById("comb1").style.left = "1px"),
    (document.getElementById("comb1").style.top = "51px"),
    (document.getElementById("comb2").style.height = "100px"),
    (document.getElementById("comb2").style.width = "100px"),
    (document.getElementById("comb2").style.left = "80px"),
    (document.getElementById("comb2").style.top = "1px"),
    (document.getElementById("comb3").style.height = "100px"),
    (document.getElementById("comb3").style.width = "100px"),
    (document.getElementById("comb3").style.left = "159px"),
    (document.getElementById("comb3").style.top = "51px"),
    (document.getElementById("comb4").style.height = "100px"),
    (document.getElementById("comb4").style.width = "100px"),
    (document.getElementById("comb4").style.left = "1px"),
    (document.getElementById("comb4").style.top = "149px"),
    (document.getElementById("comb5").style.height = "100px"),
    (document.getElementById("comb5").style.width = "100px"),
    (document.getElementById("comb5").style.left = "80px"),
    (document.getElementById("comb5").style.top = "199px"),
    (document.getElementById("comb6").style.height = "100px"),
    (document.getElementById("comb6").style.width = "100px"),
    (document.getElementById("comb6").style.left = "159px"),
    (document.getElementById("comb6").style.top = "149px"),
    (document.getElementById("comb7").style.height = "100px"),
    (document.getElementById("comb7").style.width = "100px"),
    (document.getElementById("comb7").style.left = "80px"),
    (document.getElementById("comb7").style.top = "100px"),
    get_yesterday(),
    get_today(),
    (dark =
      !0 === localStorage.hasOwnProperty("useDarkMode")
        ? Number(localStorage.getItem("useDarkMode"))
        : 1),
    darkmode();
};
