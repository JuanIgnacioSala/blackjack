const modulo = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"],
        n = ["J", "Q", "K", "A"]; let r = []; const o = document.querySelector("#pedir"),
        l = document.querySelector("#detener"),
        s = document.querySelector("#nuevo"),
        a = document.querySelectorAll(".divCartas"),
        c = document.querySelectorAll("small"),
        d = (t = 2) => { e = i(), r = []; for (let e = 0; e < t; e++) r.push(0);
            c.forEach(e => e.innerText = 0), a.forEach(e => e.innerHTML = ""), o.disabled = !1, l.disabled = !1 },
        i = () => { e = []; for (let n = 2; n <= 10; n++)
                for (let r of t) e.push(n + r); for (let r of t)
                for (let t of n) e.push(t + r); return _.shuffle(e) },
        u = () => { if (0 === e.length) throw "NO HAY MAS CARTAS"; return e.pop() },
        f = (e, t) => (r[t] = r[t] + (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), c[t].innerText = r[t], r[t]),
        h = (e, t) => { const n = document.createElement("img");
            n.src = `assets/cartas/${e}.png`, n.classList.add("carta"), a[t].append(n) },
        m = e => { let t = 0;
            do { const n = u(); if (t = f(n, r.length - 1), h(n, r.length - 1), e > 21) break } while (t < e && e <= 21);
            (() => { const [e, t] = r;
                setTimeout(() => { e > t && e <= 21 ? alert("Ganaste Genio !!") : e === t ? alert("Nadie Gana") : t > 21 ? alert("Ganaste Genio !!") : alert("Compu Wins") }, 20) })() }; return o.addEventListener("click", () => { const e = u(),
            t = f(e, 0);
        h(e, 0), t > 21 ? (console.warn("Perdiste"), o.disabled = !0, l.disabled = !0, m(t)) : 21 === t && (console.warn("21, puntaje perfecto."), o.disabled = !0, l.disabled = !0, m(t)) }), l.addEventListener("click", () => { o.disabled = !0, l.disabled = !0, m(r[0]) }), s.addEventListener("click", () => { console.clear(), d() }), { nuevoJuego: d } })();