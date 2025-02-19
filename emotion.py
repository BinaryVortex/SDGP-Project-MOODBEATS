from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.image import Image
from kivy.uix.label import Label
from kivy.clock import Clock
from kivy.graphics.texture import Texture
import cv2
from deepface import DeepFace
import numpy as np

class EmotionDetectionApp(App):
    def build(self):
        self.layout = BoxLayout(orientation='vertical')

        # Camera Feed
        self.image = Image()
        self.layout.add_widget(self.image)

        # Label for detected emotion
        self.emotion_label = Label(text="Detecting emotion...", font_size=20)
        self.layout.add_widget(self.emotion_label)

        # Initialize Camera
        self.capture = cv2.VideoCapture(0)
        Clock.schedule_interval(self.update, 1.0 / 10.0)  # Update 10 times per second

        return self.layout

    def update(self, dt):
        ret, frame = self.capture.read()
        if ret:
            # Convert image for Kivy display
            buf = cv2.flip(frame, 0).tobytes()
            texture = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')
            texture.blit_buffer(buf, colorfmt='bgr', bufferfmt='ubyte')
            self.image.texture = texture

            # Detect emotion
            try:
                analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                dominant_emotion = analysis[0]['dominant_emotion']
                self.emotion_label.text = f"Emotion: {dominant_emotion}"
            except:
                self.emotion_label.text = "No face detected"

    def on_stop(self):
        self.capture.release()

if __name__ == '__main__':
    EmotionDetectionApp().run()
