import keyboard
from plyer import notification

def show_alert(title, message):
    notification.notify(
        title=title,
        message=message,
        app_name='Test Notification',
        timeout=10
    )

def on_key_event(event):
    show_alert("키 입력 감지", f"키 입력: {event.name}")

keyboard.on_press(on_key_event)

print("키보드 입력을 감지합니다. 종료하려면 Ctrl+C를 누르세요.")
keyboard.wait('esc')
