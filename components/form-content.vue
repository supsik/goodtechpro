<template>
  <div class="form-content">
    <div class="tabs" v-if="!isFormSubmitted">
      <button
        :class="['tab-button', { active: activeTab === 'questionnaire' }]"
        @click="activeTab = 'questionnaire'"
      >
        📝 Опросник
      </button>
      <button
        :class="['tab-button', { active: activeTab === 'feedback' }]"
        @click="goToFeedbackTab"
      >
        💬 Обратная связь
      </button>
    </div>
    <div class="tab-content">
      <div v-if="activeTab === 'questionnaire'" class="questionnaire-tab">
        <form @submit.prevent="saveAndGoToFeedback">
          <div
            class="question"
            v-for="(question, index) in questions"
            :key="index"
          >
            <label :for="'question-' + index" class="question-label">
              {{ question.text }}
              <span v-if="question.required" class="required">*</span>
            </label>
            <input
              v-if="question.type === 'text'"
              :id="'question-' + index"
              v-model="questionnaireAnswers[index]"
              type="text"
              :placeholder="question.placeholder"
              class="form-input"
            />
            <select
              v-else-if="question.type === 'select'"
              :id="'question-' + index"
              v-model="questionnaireAnswers[index]"
              class="form-select"
            >
              <option value="">Выберите вариант</option>
              <option
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                :value="option.text"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div v-if="calculatedPrice" class="price-preview">
            <div class="price-label">Примерная стоимость:</div>
            <div class="price-value">{{ formatPrice(calculatedPrice) }}</div>
            <div class="price-note">
              *Точную стоимость рассчитает менеджер после консультации
            </div>
          </div>
          <button
            type="submit"
            class="submit-btn"
            :disabled="!isQuestionnaireValid"
          >
            Перейти к форме обратной связи →
          </button>
        </form>
				<span class="form-content__info">* Опрос и его результат не являются публичной офертой</span>
      </div>
      <div v-if="activeTab === 'feedback'" class="feedback-tab">
        <div v-if="!isFormSubmitted" class="feedback-form-container">
          <div v-if="hasSavedAnswers" class="saved-answers">
            <h4>📋 Ваши ответы на опрос:</h4>
            <div
              v-for="(question, index) in questions"
              :key="index"
              class="answer-item"
            >
              <strong>{{ question.text }}:</strong>
              {{ questionnaireAnswers[index] || "Не указано" }}
            </div>
            <div v-if="calculatedPrice" class="answer-item total-price">
              <strong>Предварительная стоимость:</strong>
              {{ formatPrice(calculatedPrice) }}
            </div>
            <button @click="clearAnswers" class="clear-btn">
              Очистить ответы
            </button>
          </div>
          <div v-else class="no-answers">
            <p>
              Вы не заполнили опросник. Можете вернуться и заполнить его для
              получения точной оценки.
            </p>
            <button
              @click="activeTab = 'questionnaire'"
              class="back-to-questionnaire"
            >
              Заполнить опросник
            </button>
          </div>
          <form @submit.prevent="submitFeedback">
            <div class="form-group">
              <label for="name">Имя <span class="required">*</span></label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="Введите ваше имя"
                :class="{ error: errors.name }"
                @input="clearError('name')"
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="example@mail.com"
                :class="{ error: errors.email }"
                @input="clearError('email')"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="phone">Телефон</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
								v-maska="'+7 (###) ###-##-##'"
                :class="{ error: errors.phone }"
                @input="clearError('phone')"
              />
              <span v-if="errors.phone" class="error-message">{{
                errors.phone
              }}</span>
            </div>
            
            <div class="contact-requirement-note">
              <span>ℹ️</span>
              <p>Укажите email или телефон для связи (обязательно хотя бы одно)</p>
            </div>
            
            <div class="form-group">
              <label for="message">Дополнительная информация</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                placeholder="Расскажите подробнее о вашем проекте..."
              ></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? "Отправка..." : "Отправить заявку" }}
            </button>
          </form>
        </div>
        <div v-else class="success-message">
          <h3>Спасибо за заявку!</h3>
          <p>Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
          <button @click="resetAll" class="reset-btn">Заполнить заново</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const activeTab = ref<"questionnaire" | "feedback">("questionnaire");

interface QuestionOption {
  text: string;
  priceMin: number;
  priceMax: number;
}

interface Question {
  text: string;
  type: "text" | "select";
  required?: boolean;
  placeholder?: string;
  options?: QuestionOption[];
}

const questions: Question[] = [
  {
    text: "Сколько страниц планируется на вашем сайте?",
    type: "select",
    options: [
      { text: "1-3", priceMin: 25000, priceMax: 50000 },
      { text: "4-10", priceMin: 35000, priceMax: 75000 },
      { text: "11-50", priceMin: 45000, priceMax: 85000 },
      { text: "50+", priceMin: 100000, priceMax: 300000 },
    ],
  },
  {
    text: "Направление сайта",
    type: "select",
    options: [
      { text: "Лендинг", priceMin: 25000, priceMax: 50000 },
      { text: "Интернет-магазин", priceMin: 35000, priceMax: 75000 },
      { text: "CRM-система", priceMin: 45000, priceMax: 85000 },
      { text: "Другое", priceMin: 100000, priceMax: 300000 },
    ],
  },
];

const questionnaireAnswers = ref<(string | null)[]>(
  new Array(questions.length).fill(null),
);

const hasSavedAnswers = computed(() => {
  return questionnaireAnswers.value.some(
    (answer) => answer && answer.trim().length > 0,
  );
});

const calculatedPrice = computed(() => {
  let totalMin = 0;
  let totalMax = 0;
  let hasAllAnswers = true;

  questions.forEach((question, index) => {
    const answer = questionnaireAnswers.value[index];
    if (!answer) {
      hasAllAnswers = false;
      return;
    }

    if (question.options) {
      const selectedOption = question.options.find(
        (opt) => opt.text === answer,
      );
      if (selectedOption) {
        totalMin += selectedOption.priceMin;
        totalMax += selectedOption.priceMax;
      }
    }
  });

  if (!hasAllAnswers) return null;

  return {
    min: totalMin,
    max: totalMax,
    average: Math.round((totalMin + totalMax) / 2),
  };
});

const isQuestionnaireValid = computed(() => {
  return questions.every((question, index) => {
    if (!question.required) return true;
    const answer = questionnaireAnswers.value[index];
    return answer && answer.trim().length > 0;
  });
});

const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const errors = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const isSubmitting = ref(false);
const isFormSubmitted = ref(false);

const formatPrice = (
  price: { min: number; max: number; average: number } | null,
) => {
  if (!price) return "";
  return `${price.min.toLocaleString()} - ${price.max.toLocaleString()} ₽`;
};

const saveAndGoToFeedback = () => {
  if (isQuestionnaireValid.value) {
    activeTab.value = "feedback";
  } else {
    alert("Пожалуйста, ответьте на все обязательные вопросы перед переходом.");
  }
};

const goToFeedbackTab = () => {
  activeTab.value = "feedback";
};

const clearAnswers = () => {
  questionnaireAnswers.value = new Array(questions.length).fill(null);
};

const validateForm = (): boolean => {
  let isValid = true;

  if (!formData.value.name.trim()) {
    errors.value.name = "Пожалуйста, введите ваше имя";
    isValid = false;
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = "Имя должно содержать минимум 2 символа";
    isValid = false;
  }

  if (formData.value.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
      errors.value.email = "Пожалуйста, введите корректный email адрес";
      isValid = false;
    }
  }

  if (formData.value.phone.trim()) {
    if (!/^[\s\d\+\(\)\-]{10,}$/.test(formData.value.phone)) {
      errors.value.phone = "Введите корректный номер телефона";
      isValid = false;
    }
  }

  const hasEmail = formData.value.email.trim().length > 0;
  const hasPhone = formData.value.phone.trim().length > 0;
  
  if (!hasEmail && !hasPhone) {
    errors.value.email = "Укажите email или телефон для связи";
    errors.value.phone = "Укажите email или телефон для связи";
    isValid = false;
  }

  return isValid;
};

const clearError = (field: keyof typeof errors.value) => {
  errors.value[field] = "";
  
  if ((field === 'email' || field === 'phone')) {
    const hasEmail = formData.value.email.trim().length > 0;
    const hasPhone = formData.value.phone.trim().length > 0;
    
    if (hasEmail || hasPhone) {
      errors.value.email = "";
      errors.value.phone = "";
    }
  }
};

const submitFeedback = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const submissionData: any = {
      contact: {
        name: formData.value.name,
        email: formData.value.email || null,
        phone: formData.value.phone || null,
        message: formData.value.message,
      },
    };

    if (hasSavedAnswers.value) {
      submissionData.questionnaire = {
        answers: questions.map((q, i) => ({
          question: q.text,
          answer: questionnaireAnswers.value[i],
        })),
        estimatedPrice: calculatedPrice.value,
      };
    }

    console.log("Заявка отправлена:", submissionData);

    isFormSubmitted.value = true;
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    alert("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
  } finally {
    isSubmitting.value = false;
  }
};

const resetAll = () => {
  questionnaireAnswers.value = new Array(questions.length).fill(null);
  isFormSubmitted.value = false;

  formData.value = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  errors.value = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
};
</script>

<style lang="scss" scoped>
.form-content {
  margin-top: 24px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.tab-button {
  width: 50%;
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #fff;
  }

  &.active {
    color: #fff;

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #007bff;
    }
  }
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.questionnaire-tab,
.feedback-tab {
  max-width: 600px;
  margin: 0 auto;
  background-image: linear-gradient(#13163c, #060a23);
  backdrop-filter: blur(10px);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.question {
  margin-bottom: 28px;
}

.question-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #fff;
  font-size: 16px;
}

.required {
  color: #ff4444;
  margin-left: 4px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #fff;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
}

.price-preview {
  margin: 24px 0;
  padding: 16px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 123, 255, 0.3);
  text-align: center;

  .price-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 8px;
  }

  .price-value {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 8px;
  }

  .price-note {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
}

.saved-answers {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(40, 167, 69, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(40, 167, 69, 0.3);

  h4 {
    color: #28a745;
    margin-bottom: 12px;
    font-size: 16px;
  }

  .answer-item {
    color: rgba(255, 255, 255, 0.9);
    font-size: 13px;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }

    strong {
      color: #28a745;
    }

    &.total-price {
      margin-top: 8px;
      padding-top: 8px;
      font-size: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: none;
    }
  }

  .clear-btn {
    margin-top: 12px;
    padding: 6px 12px;
    background: rgba(220, 53, 69, 0.2);
    color: #ff6b6b;
    border: 1px solid rgba(220, 53, 69, 0.3);
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(220, 53, 69, 0.3);
    }
  }
}

.no-answers {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(255, 193, 7, 0.3);
  text-align: center;

  span {
    font-size: 32px;
    display: block;
    margin-bottom: 8px;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin-bottom: 12px;
  }

  .back-to-questionnaire {
    padding: 8px 16px;
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
    border: 1px solid rgba(255, 193, 7, 0.5);
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 193, 7, 0.3);
    }
  }
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #fff;
    font-size: 14px;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 14px;
    background: transparent;
    border: 1px solid #FFF;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    &.error {
      border-color: #ff4444;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
}

.contact-requirement-note {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin-bottom: 20px;
  background: rgba(255, 193, 7, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ffc107;
  
  span {
    font-size: 16px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
    margin: 0;
  }
}

.error-message {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #ff4444;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  &:disabled {
    background: linear-gradient(135deg, #999 0%, #666 100%);
    cursor: not-allowed;
    transform: none;
  }
}

.success-message {
  text-align: center;
  padding: 40px 20px;

  h3 {
    color: #28a745;
    margin-bottom: 12px;
    font-size: 24px;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 28px;
  }
}

.form-content__info {
	margin-top: 20px;
	font-size: 12px;
	color: #ADADAD;
	display: block;
	text-align: center;
}

.reset-btn {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
}

@media (max-width: 768px) {
  .form-content {
    padding: 0 15px;
  }

  .tab-button {
    padding: 10px 16px;
    font-size: 14px;
  }

  .questionnaire-tab,
  .feedback-tab {
    padding: 20px;
  }

  .price-value {
    font-size: 20px;
  }
}
</style>