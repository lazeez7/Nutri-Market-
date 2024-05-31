import React, { useEffect, useState, useRef } from 'react';
import './header_two.css';
import Drawer from 'react-modern-drawer';
import { GrCart } from 'react-icons/gr';
import 'react-modern-drawer/dist/index.css';
import { AXIOS } from '../../utils';
import { useCart } from 'react-use-cart';
import ProductModal from '../modal/Modal';
import pizza from '../header-two/pizza.png';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const Header_two = () => {
  const {
    totalItems,
    isEmpty,
    removeItem,
    emptyCart,
    updateItemQuantity,
    items,
    cartTotal,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState({});
  const [sms, setSms] = useState(0);
  const [address, setAddress] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.className = 'locked';
    } else {
      document.body.removeAttribute('class');
    }
  }, [isOpen]);

  useEffect(() => {
    AXIOS.get('/categories/').then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, // Adjust based on when you want the section to become active
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [categories]);

  const sendBotFunc = async () => {
    const { data: curUser } = await AXIOS.post('/login/', {
      sms: sms,
      phone_number: phone,
    });

    if (curUser.status === 400) {
      alert('Raqam yoki sms kod xato!');
      return;
    }

    await axios
      .post(
        `https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage?chat_id=YOUR_CHAT_ID&text=${encodeURIComponent(
          `Имя: ${curUser.user_name}\nНомер: ${curUser.phone}\nАдрес: ${address}\n\n` +
            items
              .map(
                (item) =>
                  `Название: ${item.name_ru}\nЦена: ${item.price}\nКоличество: ${item.quantity}`
              )
              .join(`\n\n`)
        )}&parse_mode=MarkdownV2`
      )
      .then(() => {
        emptyCart();
        window.location.reload();
      });
  };

  let total = 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  useEffect(() => {
    if (isOpen === false) {
      setIsModalOpen(false);
    }
  }, [isOpen]);
  const handleSendFunc = (event) => {
    event.preventDefault();

    if (name === '') {
      alert('Malumotlarni To`ldiring');
    } else if (phone === 0) {
      alert('Malumotlarni toldirmagansiz');
    } else {
      sendBotFunc();
    }
  };

  const handleSms = async () => {
    if (!phone) {
      return;
    }

    const { data } = await AXIOS.post('/register/', {
      full_name: name,
      phone_number: phone,
    });

    if (data.message === 'Bu foydalanuvchi bor') {
      await AXIOS.post('/send/', {
        phone_number: phone,
      });
    }
  };

  return (
    <>
      <div className='header-main'>
        <div className='container'>
          <div className='wrap_two'>
            <div className='flex nav_two'>
              {categories?.map((cat) => (
                <a
                  href={`#${cat.name_en}`}
                  key={cat.id}
                  className={activeSection === cat.name_en ? 'active' : ''}
                >
                  {cat.name_ru}
                </a>
              ))}
            </div>
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction='right'
              className='navbar-mobile'
              size={400}
              lockBackgroundScroll
            >
              <div className='modal_block'>
                <div onClick={toggleDrawer} className='back'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    className='bi bi-x-lg'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                  </svg>
                </div>
                {isEmpty ? (
                  <>
                    <img src={pizza} alt='' />
                    <div className='modal-text'>
                      <h4>Пока нет товаров</h4>
                      <h5>
                        Ваша корзина пуста, откройте «Меню» и выберите
                        понравившийся товар.
                      </h5>
                    </div>
                    <div onClick={toggleDrawer} className='modal-btn'>
                      <a href='#novinki'>
                        <button>Меню</button>
                      </a>
                    </div>
                  </>
                ) : (
                  <div className='use_cart_korzina'>
                    <div className='clear-box'>
                      <button className='clear' onClick={emptyCart}>
                        Очистить корзину
                      </button>
                    </div>
                    <div className='korzina_products'>
                      {items?.map((el) => {
                        const priceCount = el.count * el.price;
                        total += priceCount;
                        if (el.count >= 1) {
                          return (
                            <div className='card-modal' key={el.id}>
                              <img src={el.image} alt='' />
                              <span className='sapn'>
                                <h3>{el.name_ru}</h3>
                                <p>{el.price}сум</p>
                              </span>
                              <div className='plus'>
                                <button
                                  onClick={() =>
                                    updateItemQuantity(el.id, el.quantity + 1)
                                  }
                                >
                                  +
                                </button>
                                <h3>{el.quantity}</h3>
                                <button
                                  onClick={() =>
                                    updateItemQuantity(el.id, el.quantity - 1)
                                  }
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          );
                        } else {
                          removeItem(el.id);
                        }
                      })}
                    </div>
                    <div className='bottom'>
                      <h4>Сумма заказа : {cartTotal}сум</h4>
                      <button
                        className='order'
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        Оформить заказ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Drawer>
            <div className='korzinka flex'>
              <button
                className={totalItems > 0 ? 'active' : 'zero'}
                onClick={toggleDrawer}
              >
                <GrCart size={'25'} />
              </button>
              <sub>{totalItems}</sub>
            </div>
          </div>
        </div>
      </div>
      <div className='container' id='novinki'>
        {categories?.map((cat) => (
          <section key={cat.id} id={cat.name_en}>
            <h1>{cat.name_ru}</h1>
            <div className='wrapper'>
              {cat.burgers.map((burger) => (
                <div className='main-card' key={burger.id}>
                  <div className='cards_img'>
                    <img src={burger.image} alt='' />
                  </div>
                  <div className='cards_detalis'>
                    <h5>{burger.name_ru}</h5>
                    <div className='box'>
                      <button
                        className='cart_btn'
                        onClick={() =>
                          setModalState({
                            open: true,
                            data: burger,
                          })
                        }
                      >
                        <GrCart size={'23px'} />
                      </button>
                      <h6 className='price'>
                        от {burger.price.toLocaleString()} сум
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      {isModalOpen && (
        <Modal open={true}>
          <Box sx={style}>
            <form onSubmit={handleSendFunc} className='custom__form'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='custom__form_btn'
              >
                x
              </button>
              <input
                type='text'
                placeholder='имя'
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type='tel'
                placeholder='Номер Телефона: 998XXXXXXXXX'
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <p className='custom__form_sms' onClick={handleSms}>
                Отправить смс
              </p>
              <input
                type='number'
                placeholder='Код'
                onChange={(event) => setSms(event.target.value)}
                required
              />
              <input
                type='text'
                placeholder='Адрес'
                onChange={(event) => setAddress(event.target.value)}
                required
              />
              <button type='submit' className='btn-submit'>
                Отправить
              </button>
            </form>
          </Box>
        </Modal>
      )}
      <ProductModal state={modalState} setState={setModalState} />
    </>
  );
};

export default Header_two;
