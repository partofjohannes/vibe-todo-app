import streamlit as st

st.title("✨ Meine Vibe To-Do-List ✨")
tasks = st.session_state.get("tasks", [])

new_task = st.text_input("Was willst du heute machen? 😎")
if st.button("Hinzufügen"):
    if new_task:
        tasks.append(new_task)
        st.session_state.tasks = tasks
        st.success(f"Aufgabe '{new_task}' hinzugefügt!")

st.write("### Deine Aufgaben:")
for i, task in enumerate(tasks):
    st.write(f"{i+1}. {task}")