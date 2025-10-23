# -*- coding: utf-8 -*-
import streamlit as st

st.title("✨ Abenteuer: Reise durch die 3 Magischen Tore! ✨")

st.write("Du bist ein kleiner Abenteurer auf einer spannenden Reise! Vor dir stehen 3 magische Tore. Beantworte die Frage an jedem Tor mit 'Ja', und das Tor öffnet sich animiert. Am Ende wartet ein Schatz der guten Worte! 😊")

# Session state für Reise-Fortschritt
if 'gate' not in st.session_state:
    st.session_state.gate = 0  # Start bei Tor 0
if 'passed' not in st.session_state:
    st.session_state.passed = [False, False, False]

gates = [
    {"name": "Tor der Wahrheit 🔍", "question": "Ist es wahr?", "closed": "Du stehst vor dem ersten Tor. Es ist aus Stein und hat ein Schloss. Ist deine Nachricht wahr?", "suggestion": "Denk nach: Stimmt es wirklich? Wenn nicht, ändere es!"},
    {"name": "Tor der Notwendigkeit ⚖️", "question": "Ist es notwendig?", "closed": "Du bist am zweiten Tor aus Holz. Muss deine Nachricht gesagt werden?", "suggestion": "Überlege: Hilft es jemandem? Wenn nicht, lass es!"},
    {"name": "Tor der Freundlichkeit ❤️", "question": "Ist es freundlich?", "closed": "Das dritte Tor ist golden. Ist deine Nachricht nett?", "suggestion": "Mach es freundlicher, z. B. bei 'Du stinkst': 'Du könntest duschen, das hilft! 😊'"}
]

message = st.text_area("Deine Nachricht für die Reise:", placeholder="z. B. 'Du stinkst'")

if message:
    current = st.session_state.gate
    if current < 3:
        st.subheader(gates[current]["name"])
        st.write(gates[current]["closed"])

        # Geschlossenes Tor (Emoji als Platzhalter)
        st.write("🚪🚪🚪 (Geschlossenes Tor)")

        if st.button(f"Ja, {gates[current]["question"].lower()} Öffne das Tor!"):
            st.session_state.passed[current] = True
            st.session_state.gate += 1
            st.rerun()

        if not st.session_state.passed[current]:
            st.info(gates[current]["suggestion"])

    else:
        # Alle Tore offen
        st.success("🎉 Alle Tore offen! Du hast den Schatz der guten Worte gefunden! Sag deine Nachricht mit Vibe! 😊")
        st.balloons()
        # Offene Tore GIFs (kindgerecht animiert)
        st.image("https://media.tenor.com/y76xw2cQA3kAAAAM/welcome-door-open.gif", caption="Tor 1 offen!")
        st.image("https://media.tenor.com/PQjp0Q-_6DcAAAAM/welcome-please-enter.gif", caption="Tor 2 offen!")
        st.image("https://upload.wikimedia.org/wikipedia/commons/7/73/Drawbar_model.gif", caption="Tor 3 offen!")

        if st.button("Neue Reise starten"):
            st.session_state.gate = 0
            st.session_state.passed = [False, False, False]
            st.rerun()

st.write("App by Grok – Für kleine Abenteurer! 🚀")