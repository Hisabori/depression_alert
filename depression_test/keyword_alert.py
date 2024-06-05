import keyboard
import threading
import logging
from plyer import notification

# 로그 설정
logging.basicConfig(filename='keyword_alert.log', level=logging.DEBUG,
                    format='%(asctime)s - %(message)s')

logging.info("키워드 감시 스크립트 시작")

# 우울증 체크 키워드 목록
keywords = [
    '우울', '슬픔', '절망', '무기력', '자살', '희망없음', '눈물',
    '기운 없음', '피곤', '삶의 의미 없음', '죽고 싶다', '극단선택', '포기'
]

def check_depression(input_text):
    input_text = input_text.lower()

    for keyword in keywords:
        if keyword in input_text:
            logging.info(f'Keyword detected: {keyword}')
            threading.Thread(target=show_alert, args=("우울증 경고", "우울증 가능성이 있습니다. 전문가의 상담을 받아보세요.")).start()
            return "우울증 가능성이 있습니다. 전문가의 상담을 받아보세요."

    return "우울증 가능성이 낮습니다. 그래도 건강한 생활 습관을 유지하세요."

def show_alert(title, message):
    logging.info(f'Showing alert: {title} - {message}')
    notification.notify(
        title=title,
        message=message,
        app_name='Depression Alert',
        timeout=10
    )

def on_key_event(event):
    global buffer
    buffer += event.name
    logging.debug(f'Key pressed: {event.name}')

    if any(keyword in buffer for keyword in keywords):
        result = check_depression(buffer)
        print(result)
        logging.info(f'Buffer: {buffer}')
        buffer = ""

buffer = ""

keyboard.on_press(on_key_event)

logging.info("키워드 감시를 시작합니다. 종료하려면 Ctrl+C를 누르세요.")
print("키워드 감시를 시작합니다. 종료하려면 Ctrl+C를 누르세요.")

keyboard.wait('esc')

