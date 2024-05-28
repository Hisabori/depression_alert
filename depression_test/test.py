from plyer import notification

notification.notify(
    title='테스트 알림',
    message='이것은 테스트 알림입니다.',
    app_name='Notification Test',
    timeout=10
)
