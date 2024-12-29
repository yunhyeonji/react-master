import React, { useEffect, useRef, useState } from 'react';

let counter = 0;
function ButtonCounter() {
  // UI와 관련없는 값을 업데이트할 때 사용한다.
  const countRef = useRef(0);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    countRef.current++;
    console.log('countRef : ', countRef);

    counter++;
    console.log('counter : ', counter);
    setCount(counter);

    console.log('useState count : ', count);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Count</button>;
}

function Form() {
  const [form, setForm] = useState({
    title: '제목',
    author: 'hyeonji',
    content: '',
  });

  // DOM 요소를 조작한다.
  const titleInputRef = useRef(null);
  const authorInputRef = useRef(null);
  const contentTextareaRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title) {
      titleInputRef.current.focus();
      return;
    }
    if (!form.author) {
      authorInputRef.current.focus();
      return;
    }
    if (!form.content) {
      contentTextareaRef.current.focus();
      return;
    }
    console.log('저장 완료!');
  };

  const handleForm = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [isChanged, setIsChanged] = useState(false);
  const prevForm = useRef(null);

  // 초기 세팅
  useEffect(() => {
    prevForm.current = { ...form };

    if (!form.title) {
      titleInputRef.current.focus();
      return;
    }
    if (!form.author) {
      authorInputRef.current.focus();
      return;
    }
    if (!form.content) {
      contentTextareaRef.current.focus();
      return;
    }
  }, []);

  // 변화감지
  useEffect(() => {
    const hasChanged =
      prevForm.current.title !== form.title ||
      prevForm.current.author !== form.author ||
      prevForm.current.content !== form.content;
    setIsChanged(hasChanged);
  }, [form]);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>글쓰기</legend>
        <input
          ref={titleInputRef}
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleForm}
        />
        <h2 />
        <input
          ref={authorInputRef}
          name="author"
          placeholder="작성자"
          value={form.author}
          onChange={handleForm}
        />
        <h2 />
        <textarea
          ref={contentTextareaRef}
          name="content"
          placeholder="내용"
          value={form.content}
          onChange={handleForm}
        />
        <h2 />
        <button disabled={!isChanged}>전송</button>
      </fieldset>
    </form>
  );
}

export default function AppRef(props) {
  return (
    <>
      <h2>Count</h2>
      <ButtonCounter />
      <ButtonCounter />
      <h2>Form</h2>
      <Form />
    </>
  );
}
