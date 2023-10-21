"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma1 = new client_1.PrismaClient();

async function seed() {
  const email = "felipealisboa@outlook.com";
  const username = "felipealisboa";
  
  //await prisma1.user.deleteMany().catch(e => 'registers not found it.');
  // await prisma1.permission.deleteMany();
  //await prisma1.role.deleteMany();

  const hashedPassword = await bcrypt.hash("97150280", 10);
  console.time('🔑 Created permissions...')
	const entities = ['user', 'note']
	const actions = ['create', 'read', 'update', 'delete']
	const accesses = ['own', 'any']
	
  for (const entity of entities) {
		for (const action of actions) {
			for (const access of accesses) {
				await prisma1.permission.create({ data: { entity, action, access } })
			}
		}
	} 
  
  
  console.timeEnd('🔑 Created permissions...')

  console.time('👑 Created roles...')
	 await prisma1.role.create({
		data: {
			name: 'admin',
			permissions: {
				connect: await prisma1.permission.findMany({
					select: { id: true },
					where: { access: 'any' },
				}),
			},
		},
	})
	await prisma1.role.create({
		data: {
			name: 'user',
			permissions: {
				connect: await prisma1.permission.findMany({
					select: { id: true },
		  			where: { access: 'own' },
				}),
			},
		},
	})
	console.timeEnd('👑 Created roles...')

  const user = await prisma1.user.create({
    data: {
      email,
      username,
      roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma1.user.create({
    data: {
      email: 'contato.rafaelvinicius@gmail.com',
      username: 'rafael',
      roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  /* Upload country / Banks / Payment methods */
  /* Brazil */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Brazil",
      flag: "https://flagicons.lipis.dev/flags/4x3/br.svg",
      banks: {
        create: [
        {
          name: "Santander",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [
              {
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://thumbs2.imgbox.com/eb/5c/EYLhH1TM_t.png",
                  st2_text: "Select Pix option to see th options to make payment with PIX (by code or QR Code).",
                  st3_pic: "https://thumbs2.imgbox.com/90/69/fTGEd5bk_t.png",
                  st3_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer and click on Continue until the Bank ask for the PIN to confirm the transfer. For hight amount the client will need some personal confirmation like scan the face.", 
                  st3_pic: "https://thumbs2.imgbox.com/49/a9/ESpTAMdl_t.png",
                  st3_text: "Santander have the option to do PIX for third bank account, just need to choose the option and fulfill the details. ", 
                }]
              },
              },            
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
                limits: "BRL 3,000/day for online shopping",
                information: "Santander debit card is allowed to make online shopping with the card, the client of Santander will need the Santander Way (app to control the card expenses) to generate a virtual card. The virtual card have time limit of 15 minutes, before to be re-generate a new card code.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Online |shopping (Compra na Internet), for some client the Santander can ask for PIN code or token confirmation.",
                    st3_pic: "https://thumbs2.imgbox.com/4d/c9/XFVTDzi5_t.png",
                    st3_text: "Santader have this limitation, but is very fast and safe to generate the virtual card. After the client open the Santander Way will have 3 main options: PIX, Use Virtual Card (Usar Cartão Virtual) and other, so when the client click on Generate Virtual Card, automatically will be generate the virtual card with limit of 15 minutes before to be re-generate."
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
                limits: "100% of the limits on the credit card; For online payment will have a limit of R$ 6,000 that can be handle on the app Santander Way.",
                information: "Santander just allowed online transactions if the user have the Santander Way (app to control the card expenses for Credit Cards) to generate a virtual card. The virtual card have time limit of 15 minutes, before to be re-generate a new card code.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/4d/c9/XFVTDzi5_t.png",
                    st1_text: "Santader have this limitation, but is very fast and safe to generate the virtual card. After the client open the Santander Way will have 3 main options: PIX, Use Virtual Card (Usar Cartão Virtual) and other, so when the client click on Generate Virtual Card, automatically will be generate the virtual card with limit of 15 minutes before to be re-generate.",
                    st2_pic: "https://thumbs2.imgbox.com/e6/81/1o7fFM8V_t.png",
                    st2_text: "If you want to increase the limits, so you must choose the option on the right corner of the screen.",
                    st3_pic: "https://thumbs2.imgbox.com/56/c8/RvqUfY1H_t.png",
                    st3_text: "Will be a lot of option, the client must look for Renda (Income) option.",
                    st4_pic: "https://thumbs2.imgbox.com/c4/8f/8P3kmzBy_t.png",
                    st4_text: "On the botton will be the button to claim the Update Your Rent (Quero Atualizar Minha Renda), The client on the screen will not see the real Income, but the value that Santander allow you to use like limits by your profile.",
                    st5_pic: "https://thumbs2.imgbox.com/8d/06/FpeYmmBS_t.png",
                    st5_text: "The client so will have the opportunity to inform the new Income. IMPORTANT, one time the client define the value, he just will be able to claim a new increase after 90 days, click on confirm and the new Income that you define will be available.", 
                  }]
                },
              }]
            }
          },
        {
          name: "Caixa Econômica",
          logo: "https://thumbs2.imgbox.com/29/f4/LXXzquqv_t.png",
          payment: {
            create: [
              {
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount. To register the beneficiary for high amount and also transfer follow these steps.",
              steps: {
                create: [
                  {
                  st1_pic: "https://thumbs2.imgbox.com/0d/a3/ZvzMiIrp_t.png",
                  st1_text: "The client can access the CEF online banking, click on the option to CEF Online Banking.",
                  st2_pic: "https://thumbs2.imgbox.com/14/2d/FN7ajY3E_t.png",
                  st2_text: "The client have in the app the symbol of pix and must click to open the options to pay with Pix and to register the beneficiary for high amount.",
                  st3_pic: "https://thumbs2.imgbox.com/86/ff/hy2zb7xP_t.png",
                  st3_text: "To access the beneficiary, the client need first do a payment with the PIX code. So after the client selected the Payment option need to add the PIX code or scan the QR code. Will be 2 simple steps, confirm the key, input the amount and click on continue.",
                  st4_pic: "https://thumbs2.imgbox.com/e6/44/maRLRmc6_t.png",
                  st4_text: "After step to complete the transaction is to insert the pin with 6 numbers. Consider that for high amount and for new beneficiary the client will need to scan his face and maybe other confirmations.",
                  st5_pic: "https://thumbs2.imgbox.com/f4/20/5vOslQ63_t.png",
                  st5_text: "The client will receive a confirmation of the transaction, the credit take few seconds, if you not receive the client must try again.", 
                  st6_pic: "https://thumbs2.imgbox.com/10/b1/b72XNf9P_t.png",
                  st6_text: "After the client receive the ok, need to scroll down and select the Favorite option.",
                }
              ]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/29/f4/LXXzquqv_t.png",
              limits: "Card block for any kind of international transactions.",
              information: "CEF debit card is blocked for any kind of international transactions.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/29/f4/LXXzquqv_t.png",
                  st1_text: "CEF debit card is not allowed.",
                  st2_pic: "",
                  st2_text: ""
                }]
              }
          },
          {
            type: "credit",
            symbol: "https://thumbs2.imgbox.com/f4/f0/xtzhMPYO_t.png",
            limits: "Variable by clients history, been the minimum R$ 1.000,00. The client can consult the credit card limit on your invoice, on the CAIXA Cards Application or on the CAIXA Internet Banking.",
            information: "CEF credit cards can be used for international transactions. To do so, you will need to activate the international transaction feature for your card. You can do this by contacting CEF customer service or by logging into your CEF online banking account and following the instructions.",
            steps: {
              create: [{
                st1_pic: "https://thumbs2.imgbox.com/0d/a3/ZvzMiIrp_t.png",
                st1_text: "The client can access the CEF online banking, click on the option to CEF Online Banking.",
                st2_pic: "https://thumbs2.imgbox.com/85/a9/Hd6CH88N_t.png",
                st2_text: "Go to option (right corner), after click will open the menu with option and the client must scroll down and select Credit Card (Cartão de Crédito).",
                st3_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                st3_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card.",
                st4_pic: "https://thumbs2.imgbox.com/29/c3/ERLFhPYs_t.png",
                st4_text: "Choose the option to allow online shopping and confirm."
              }]
            },
          }]
        },
        }, 
        {
          name: "Banco do Brasil",
          logo: "https://logopng.com.br/logos/banco-do-brasil-5.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/65/7a/Apuetk6g_t.png",
                  st1_text: "Open Banco do Brasil APP and on the home screen choose PIX option",
                  st2_pic: "https://thumbs2.imgbox.com/f1/fb/GV2nUV5P_t.png",
                  st2_text: "The client will see the option to do the transaction that can be handle with PIX code or a QR code generate by an e-commerce. The client can handle and consult limits on the botton of the screen.",
                  st3_pic: "https://thumbs2.imgbox.com/32/0c/0o7W5AHu_t.png",
                  st3_text: "The client must fullfil the data of payment, amount and description (optional) and continue until PIN code confirmation, depends of the amount the app can request face recognize.",
                  st4_pic: "https://thumbs2.imgbox.com/a5/b5/bHDifwqN_t.png",
                  st4_text: "In the end of the process the client can print the invoice",
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/c0/91/113gQibU_t.jpg",
              limits: "The limits for debit card is 100% of the money that the client have in the account;",
              information: "Banco do Brasil have the option to convert a card to a credit function. The debit card don't have the option to allow international transaction, but works for national transaction without cost for the client.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/fa/4b/niv3j2ZR_t.png",
                  st1_text: "Open BB App and look for the Menu and looks for Card (Cartão).",
                  st2_pic: "https://thumbs2.imgbox.com/2b/17/mvCyfrFz_t.png",
                  st2_text: "With the Card menu open the client need to Release and Block Card (Liberar e bloquear cartão).",
                  st3_pic: "https://thumbs2.imgbox.com/2c/4e/LlD3RtFH_t.png",
                  st3_text: "Now the client will see the option to Allow credit function (Habilitar função crédito).",
                  st4_pic: "https://thumbs2.imgbox.com/11/88/xsPAX5ZD_t.png",
                  st4_text: "The client will inform the card number and click to confirm the option.",
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/41/88/Ve8VuzkH_t.jpg",
              limits: "In the BB App, click on the Cards menu > Limits > Adjust card limit, then just move the bar or type the desired value to make the adjustment. In Internet Banking, you access this customization in Cards > Limits - Adjust card limit. If you prefer, you can also adjust the limit via WhatsApp BB (61 4004-0001), just send Change card limit and follow the instructions.",
              information: "Banco do Brasil recommend the user to use the digital card above the physical card. With the virtual card its easy to change limits. Ourocard-e can be created via the BB website, the BB APP, or the Ourocard App.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/00/54/xbZsNRvb_t.png",
                  st1_text: "Open BB App where the client will see the account details. Client must client on the Cards",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "On the right corner, 3 dots, the client must click to see the options.",
                  st3_pic: "https://thumbs2.imgbox.com/38/20/jj1YvB3C_t.png",
                  st3_text: "The third option will find: Create Virtual Card Ourocard-e.",
                  st4_pic: "https://thumbs2.imgbox.com/ae/56/zE5F6fSa_t.png",
                  st4_text: "The client must fulfill with name, define the limits of the card, the maximum value of the transaction allowed and the due date of the card.",
                  st5_pic: "https://thumbs2.imgbox.com/9d/c5/h8bMUBwy_t.png",
                  st5_text: "The client must confirm the new digital card with the PIN.",
                  st6_pic: "https://thumbs2.imgbox.com/98/64/W7BduK8e_t.png",
                  st6_text: "The client can check all detail in Option and Virtual Card. Also handle the limits of the card.",
                }]
              },
            }]
          }
        }, 
        {
          name: "Itau",
          logo: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/97f45217072303.562b554a0d901.jpg",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/51/52/nmuvBtSg_t.png",
                  st1_text: "Open Itau App and in the first screen the client can see ths symbol of PIX, just need to click on it.",
                  st2_pic: "https://thumbs2.imgbox.com/c7/b2/36ivec7Q_t.png",
                  st2_text: "Have two option, Transfer, using a PIX code, or QR code, where the client can scan or paste a QR code. We will show the steps to transfer with PIX key, but the process and steps are the same for bith options.",
                  st3_pic: "https://thumbs2.imgbox.com/e0/ab/tWW32vp7_t.png",
                  st3_text: "Must fullfil the PIX key and can check like favorite, remember that Registered beneficiary is the way to transfer with high amount.",
                  st4_pic: "https://thumbs2.imgbox.com/71/bd/B3pPe21P_t.png",
                  st4_text: "The client will choose from where with be debited the transfer, and continue the process.",
                  st5_pic: "https://thumbs2.imgbox.com/2d/13/Aoj6cgGf_t.png",
                  st5_text: "Confirm the amount and the beneficiary after confirm with the PIN code",
                  st6_pic: "https://thumbs2.imgbox.com/79/fb/qHFKyZON_t.png",
                  st6_text: "The client will confirm with the card password (6 digits).",
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/20/f7/uaxBG3Pl_t.png",
              limits: "The most popular Itau Card have a limit of BRL 10,000/monthly; The limit just can be increase after 3 month of opened account.",
              information: "The debit card dont have a virtual option, but the client can request to convert the debit, also to credit function. Itau debit card is also a international card. The Itau recommend to generate the virtual card for online shopping if you can apply credit option to your card.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/aa/84/1emCrp6B_t.png",
                  st1_text: "After open the Itau Card app the client will see on the home screen the option Card (cartão).",
                  st2_pic: "https://thumbs2.imgbox.com/bb/55/9hXnM9eV_t.png",
                  st2_text: "After will appear 2 options of virtual cards, one that will works for 48h and other that will be vinculate with the physical card.",
                  st3_pic: "https://thumbs2.imgbox.com/64/ab/So3NYRLG_t.png",
                  st3_text: "If the client click on 48h virtual card, the same will appear automatically.",
                  st4_pic: "https://thumbs2.imgbox.com/e1/78/RRSjk0Vl_t.png",
                  st4_text: "If the client choose the second option, will have to vinculate the virtual card with a specific card. The limits of the physical card will be apply on the virtual one.",
                  st5_pic: "https://thumbs2.imgbox.com/13/db/dxA0LRYz_t.png",
                  st5_text: "After the confirmation and the client insert the card PIN code the virtual card will be on the screen and on the botton have a button to copy the card data and be used on any e-commerce."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/8d/46/hjQ3B4I8_t.png",
              limits: "The Itau have the option for credit card to hold a temporary increase of limits, ideal for high amount that woks for selected customers",
              information: "Its popular now with Itau that the debit and credit card is the same card, where the user can choose the funcionality of the card. The Itau is bigger bank in Brazil and have multiple types of card, also have Visa and Mastercard that will works diferent for any case, like online shopping.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/aa/84/1emCrp6B_t.png",
                  st1_text: "After open the Itau Card app the client will see on the home screen the option Card (cartão).",
                  st2_pic: "https://thumbs2.imgbox.com/bb/55/9hXnM9eV_t.png",
                  st2_text: "After will appear 2 options of virtual cards, one that will works for 48h and other that will be vinculate with the physical card.",
                  st3_pic: "https://thumbs2.imgbox.com/64/ab/So3NYRLG_t.png",
                  st3_text: "If the client click on 48h virtual card, the same will appear automatically.",
                  st4_pic: "https://thumbs2.imgbox.com/e1/78/RRSjk0Vl_t.png",
                  st4_text: "If the client choose the second option, will have to vinculate the virtual card with a specific card. The limits of the physical card will be apply on the virtual one.",
                  st5_pic: "https://thumbs2.imgbox.com/13/db/dxA0LRYz_t.png",
                  st5_text: "After the confirmation and the client insert the card PIN code the virtual card will be on the screen and on the botton have a button to copy the card data and be used on any e-commerce."
                }]
              },
            }]
          }
        }, 
        {
          name: "Bradesco",
          logo: "https://www.logotypes101.com/logos/40/CA8543BA7AB6ECA1FC0F97A942A51A50/Bradesco.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/f1/f4/Yt3hnaUo_t.png",
                  st1_text: "Open Bradesco App and on the home page will find the option PIX.",
                  st2_pic: "https://thumbs2.imgbox.com/5b/43/hT61scW5_t.png",
                  st2_text: "This part have the multiple choise to do the transfer, by phone, email, QR code or PIX code. Select one that fit your payment method and continue.",
                  st3_pic: "https://thumbs2.imgbox.com/e7/e3/Lws62cRS_t.png",
                  st3_text: "Important that for first transaction normally will have a limit, that can be handle on the step before registering the beneficiary. Inform the amount, description (optional) and continue to PIN confirmation.",
                  st4_pic: "https://thumbs2.imgbox.com/9f/b5/ic1oTvuc_t.png",
                  st4_text: "The client must inform the PIN code and after confirmation will receive the transfer confirmation, the credit on the beneficiary account will take less than 5 minutes to receive the credit."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/1e/f7/6ST105kZ_t.png",
              limits: "Bradesco debit card is allowed to make online shopping until 100% of the money that the client have in the account.",
              information: "Bradesco can block the transaction if looks suspicious, and works without OTP, but in some case the client can receive a SMS with a code to confirm the transaction. The card Bradesco Elo University its not allowed to international transaction.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/82/bd/2xBT8hoK_t.png",
                  st1_text: "Bradesco debit card will be Visa or Elo and the Visa should works in any platform, but also can restricted if not recognize the store. Some options that is always allowed.",
                  st2_pic: "https://thumbs2.imgbox.com/86/15/KbKmydHs_t.png",
                  st2_text: "The client have the option the register the card to pay by QR code and change the Limits for transactions.",
                  st3_pic: "https://thumbs2.imgbox.com/fa/24/kmbaTdmD_t.png",
                  st3_text: "If the click on Limit will see the limits of the card and the option to request the limit increase.",
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/64/05/BWHN4m6Z_t.png",
              limits: "Depends of the card will have different minimum limits: Mastercard Gold: R$ 450,00; Mastercard Platinum: R$ 2.400,00; Mastercard Black: R$ 14.000,00. The limit can be increase by the Bradesco Card App and will be hold by the bank until approval.",
              information: "Bradesco recommend the client to online shopping to buy with the virtual card.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/86/15/KbKmydHs_t.png",
                  st1_text: "Its easy to generate the online bank, after open the Bradesco Card App the client must click on the Card option.",
                  st2_pic: "https://thumbs2.imgbox.com/c4/f8/cHPxXVm8_t.png",
                  st2_text: "If the client not have the virtual card created must generate. The client can use virtual card until before to receive the physical card.",
                  st3_pic: "https://thumbs2.imgbox.com/69/8d/3pGTico0_t.png",
                  st3_text: "The client need to confirm the face recognition and/or the PIN code.",
                  st4_pic: "https://thumbs2.imgbox.com/5b/40/ofVGkjj1_t.png",
                  st4_text: "The virtual card is not generate and the client have the option to copy the card detail to be pasted on the online shoping.",
                }]
              },
            }]
          }
        } ]
      }
    },
  });

    /* Chile */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Chile",
      flag: "https://flagicons.lipis.dev/flags/4x3/cl.svg",
      banks: {
        create: [{
          name: "Santander",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        }]
      }
    },
  });
  
    /* Mexico */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Mexico",
      flag: "https://flagicons.lipis.dev/flags/4x3/mx.svg",
      banks: {
        create: [
          {
          name: "BBVA",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://thumbs2.imgbox.com/90/d8/4h0FO2sB_t.png",
              limits: "The limits will depends of the incomes of the client, but normally have a pattern for the BBVA card and payment limits that are 8,000 to 29,500 MX PESOS.",
              information: "The fast way to handle payments with BBVA Mexico is with transfer, because will not depend of the issuer of the card, but just if the client have money on the account.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BBVA App and choose Transfer option",
                  st2_pic: "https://thumbs2.imgbox.com/bb/eb/6KCULxY2_t.png",
                  st2_text: "Transfer with the BBVA App is easy, one time the Transfer is selected just need to follow the steps to select the account will be debited and the beneficiary, or inform the bank detail of the new beneficiary.",
                  st3_pic: "https://thumbs2.imgbox.com/9d/f6/ZbkpEg9Z_t.png",
                  st3_text: "Time to informe the amount, the concept and the reference code before to continue to transfer confirmation.",
                  st4_pic: "https://thumbs2.imgbox.com/6c/17/ZcwIQ1nQ_t.png",
                  st4_text: "The client will see the details fullfiled and the confirmation.",
                }]
              }
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "The debit card have 100% limit, but normally have a pattern for the BBVA card and payment limits with minimum and maximum per period, that are 8,000 to 29,500 MX PESOS.",
              information: "The debit card is allowed to be used for online shopping. The BBVA when the user pay with the plastic card can request an extra authentication that can be SMS or even an email to the client confirm the transaction.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/07/80/HD6cYuUr_t.png",
                  st1_text: "Open the BBVA App, on the home screen the client will see the cards that are registered. The client just to click in one of them to open the card options.", // 
                  st2_pic: "https://thumbs2.imgbox.com/22/7f/Wqeab3ig_t.png",
                  st2_text: "On the top of screen the user have the option to see the Virtual Card. The Virtual card generate will be vinculated with the card selected on the step before.",
                  st3_pic: "https://thumbs2.imgbox.com/0d/c9/P5oUCuWe_t.png",
                  st3_text: "The virtual card will be generate automatically and the client will have the option to copy the card detail to be pasted on the online shoping. Also a time with 5 minutes will show, that is the time before to generate other CVV.",
                  st4_pic: "https://images2.imgbox.com/07/80/HD6cYuUr_o.png",
                  st4_text: "The increase the limits the client can handle using the BBVA App and the cashier. On the home screen the client can select Opportunites", // 
                  st5_pic: "https://thumbs2.imgbox.com/96/a8/RATSjFJh_t.png",
                  st5_text: "The screen will show all the opportunities for the client, also to request an increase of the limits."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "The limits will depends of the incomes of the client, but normally have a pattern for the BBVA card and payment limits that are 8,000 to 29,500 MX PESOS. The client can check the credit limit by online bank or app: You can check your credit limit in a physical or digital account statement in the section called balance (Saldo) or available limit (Límite Disponible).",
              information: "To internet shopping the client must generate the virtual CVV, the CVV is valid for 5 minutes for your security and you can generate it whenever you need it.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/07/80/HD6cYuUr_t.png",
                  st1_text: "Open the BBVA App, on the home screen the client will see the cards that are registered. The client just to click in one of them to open the card options.", // 
                  st2_pic: "https://thumbs2.imgbox.com/22/7f/Wqeab3ig_t.png",
                  st2_text: "On the top of screen the user have the option to see the Virtual Card. The Virtual card generate will be vinculated with the card selected on the step before.",
                  st3_pic: "https://thumbs2.imgbox.com/0d/c9/P5oUCuWe_t.png",
                  st3_text: "The virtual card will be generate automatically and the client will have the option to copy the card detail to be pasted on the online shoping. Also a time with 5 minutes will show, that is the time before to generate other CVV.",
                  st4_pic: "https://images2.imgbox.com/07/80/HD6cYuUr_o.png",
                  st4_text: "The increase the limits the client can handle using the BBVA App and the cashier. On the home screen the client can select Opportunites", // 
                  st5_pic: "https://thumbs2.imgbox.com/96/a8/RATSjFJh_t.png",
                  st5_text: "The screen will show all the opportunities for the client, also to request an increase of the limits.",
                }]
              },
            }]
          }
          },
          {
            name: "BANREGIO",
            logo: "https://thumbs2.imgbox.com/e3/a3/FE8h1xAC_t.jpg",
            payment: {
              create: [{
                type: "transfer",
                symbol: "https://thumbs2.imgbox.com/90/d8/4h0FO2sB_t.png",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the Banregio card and payment limits that are 8,000 to 29,500 MX PESOS.",
                information: "The fast way to handle payments with Banregio Mexico is with transfer, because will not depend of the issuer of the card, but just if the client have money on the account.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/b5/47/QzhWZ3Sm_t.png",
                    st1_text: "Client need to open the Banregio App (Hola App).",
                    st2_pic: "https://thumbs2.imgbox.com/46/e0/rEsZFlGc_t.png",
                    st2_text: "The client Banregio could have 2 accounts, Dolars or Pesos, the process of transfer will be the same, on the home page when the client open the Banregio App must choose the option Transfer (third one).",
                    st3_pic: "https://thumbs2.imgbox.com/a9/16/MkoWKmvI_t.png",
                    st3_text: "Its necessary to add a beneficiary, the client must client on the Plus symbol to add the beneficiary.",
                    st4_pic: "https://thumbs2.imgbox.com/83/ad/yBUoCeFX_t.png",
                    st4_text: "Important, the Banregio App have a toggle that the client can activate to unlimited transfer, so can handle 100% of the bank account. Its also time to informe the amount, the concept and the reference code before to continue to transfer confirmation.",
                  }]
                }
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/bd/18/AjN7sAuK_t.jpg",
                limits: "The debit card have 100% limit, but normally have a pattern for the Banregio card and payment limits with minimum and maximum per period, that are 8,000 to 29,500 MX PESOS.",
                information: "The debit card is allowed to be used for online shopping. The Banregio when the user pay with the plastic card can request an extra authentication that can be SMS or even an email to the client confirm the transaction.",
                steps: {
                  create: [{ 
                    st1_pic: "https://thumbs2.imgbox.com/b5/47/QzhWZ3Sm_t.png",
                    st1_text: "Client need to open the Banregio App (Hola App).", 
                    st2_pic: "https://thumbs2.imgbox.com/75/39/CXRb5JNe_t.png",
                    st2_text: "The client need to open the Banregio App, on the Home screen must scroll to select the debit card (Cuenta Flex)", 
                    st3_pic: "https://thumbs2.imgbox.com/71/a9/C1ZrA8ea_t.png",
                    st3_text: "On the new screen the client must scroll left to find the virtual card that will be blocked. The debit card plastic should works, but when it's international transaction its the better option to generate the virtual card is allowed to transfer 100% the balance of the acount.",	
                    st4_pic: "https://thumbs2.imgbox.com/db/00/9Qeg5paD_t.png",
                    st4_text: "When the client find the virtual card need to unlock and generate the CVV that have to be pasted on the online shoping and works for 5 minutes. The confirmation of the transaction will depends of the plataform where the card is be used."
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/1c/49/XiPpiCJq_t.png",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the Banregio card and payment limits that are 8,000 to 29,500 MX PESOS. The client can check the credit limit by online bank or app: You can check your credit limit in a physical or digital account statement in the section called balance (Saldo) or available limit (Límite Disponible).",
                information: "To internet shopping the client must generate the virtual CVV, the CVV is valid for 5 minutes for your security and you can generate it whenever you need it.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/b5/47/QzhWZ3Sm_t.png",
                    st1_text: "Client need to open the Banregio App (Hola App).",
                    st2_pic: "https://thumbs2.imgbox.com/37/bc/QPxjmNRQ_t.png",
                    st2_text: "On the Home screen, where will be the picture of the cards, the client must scroll right to find the credit card picture to click on it.", // 
                    st3_pic: "https://thumbs2.imgbox.com/55/14/yYmk6xLB_t.png",
                    st3_text: "The new page will show the picture of the credit card, so the client need to scroll right again to find the virtual card, that normally will show with the lock (blocked).",
                    st4_pic: "https://thumbs2.imgbox.com/b7/eb/JZCMESOH_t.png",
                    st4_text: "After to unblock the virtual card is time to generate the cvv. When the client click on the button to generate the cvv the 5 minutes that the client have to proceed with the payment on the e-commerce will start. If the 5 minutes expire, the client must click again on the button.",
                    st5_pic: "https://thumbs2.imgbox.com/fe/26/FjYlPMu8_t.png",
                    st5_text: "The bank will ask for a confirmation before to proceed. Normally will inform that when you click the card will be able to be used on the transaction.",
                  }]
                },
              }]
            }
          },
          {
            name: "SANTANDER",
            logo: "https://thumbs2.imgbox.com/46/d9/qFR9ynil_t.jpg",
            payment: {
              create: [{
                type: "transfer",
                symbol: "https://thumbs2.imgbox.com/90/d8/4h0FO2sB_t.png",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the Santander card and payment limits that are 8,000 to 29,500 MX PESOS.",
                information: "The fast way to handle payments with Santander Mexico is with transfer, because will not depend of the issuer of the card, but just if the client have money on the account.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/95/2b/sDP0p1sl_t.png",
                    st1_text: "Client need to open the Super Wallet App.", 
                    st2_pic: "https://thumbs2.imgbox.com/46/20/nqgd0cYm_t.png",
                    st2_text: "On the home screen, on the top in the Menu option on the right, the client must click and will see the option to do the Transfer to third person.",
                    st3_pic: "https://thumbs2.imgbox.com/da/f7/FSOW76gj_t.png",
                    st3_text: "Its necessary to add a beneficiary, its also important to mark the both checkbox, tranfer today and rfc of the beneficiary. After that just need to continue until PIN confirmation. Depends of the amount Santander can request aditional authentication.",
                  }]
                }
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/2f/23/Bc2cIUK3_t.jpeg",
                limits: "The debit card have 100% limit, but normally have a pattern for the Santander card and payment limits with minimum and maximum per period, that are 8,000 to 29,500 MX PESOS.",
                information: "Most of the Santander cards nowasday dont have numbers, so for online shopping the client just can use the virtual card that can be generate on the Santander Wallet. The steps below is like a complement of the credit steps, because to generate the virtual card will be the same.",
                steps: {
                  create: [{ 
                    st1_pic: "https://thumbs2.imgbox.com/95/2b/sDP0p1sl_t.png",
                    st1_text: "To see how to generate the virtual card, check by the credit option, that will be the same then debit. Client need to open the Super Wallet App.", 
                    st2_pic: "https://thumbs2.imgbox.com/58/f9/PgIlmll8_t.png",
                    st2_text: "For the super token the client dont need to login, but just open the auth screen and click on the botton right to generate the Super Token.",	
                    st3_pic: "https://thumbs2.imgbox.com/9c/d2/aVYa4tPV_t.png",
                    st3_text: "To generate the Super Token the client need to inform the PIN Code (4 digits).",
                    st4_pic: "https://thumbs2.imgbox.com/66/2e/GBlFXswB_t.png",
                    st4_text: "The 8 digits will be change automatically with 15 seconds.",
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/fa/5b/lE7wHy69_t.jpg",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the Santander card and payment limits that are 8,000 to 29,500 MX PESOS. The client can check the credit limit by online bank or app.",
                information: "Most of the Santander cards nowasday dont have numbers, so for online shopping the client just can use the virtual card that can be generate on the Santander Wallet.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/95/2b/sDP0p1sl_t.png",
                    st1_text: "Client need to open the Super Wallet App.", 
                    st2_pic: "https://thumbs2.imgbox.com/53/92/7S9h4Rfp_t.png",
                    st2_text: "On the home screen the client will see the credit card and below the button to activate the virtual card where the client must click.", 
                    st3_pic: "https://thumbs2.imgbox.com/ca/1e/zOByIbdJ_t.png",
                    st3_text: "The client will confirm the data of the card.",
                    st4_pic: "https://thumbs2.imgbox.com/6c/3b/qwm5He5T_t.png",
                    st4_text: "The client must confirm the activation with the PIN of the card (4 digits). The bank can ask to repeat the operation.",
                    st5_pic: "https://thumbs2.imgbox.com/ee/61/68A91buV_t.png",
                    st5_text: "The client have the confirmation on the screen and can access directly the virtual card, that will have the dynamic CVV (3 minutes) before to be regenerated.",
                    st6_pic: "https://thumbs2.imgbox.com/ab/3f/sKslBDJ7_t.png",
                    st6_text: "When the client active the virtual card will find on the Menu option, on the top right of the screen.",
                  }]
                },
              }]
            }
          },
          {
            name: "HSBC",
            logo: "https://thumbs2.imgbox.com/26/2f/ssPTwMt5_t.jpg",
            payment: {
              create: [{
                type: "transfer",
                symbol: "https://thumbs2.imgbox.com/90/d8/4h0FO2sB_t.png",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the HSBC card and payment limits that are 8,000 to 29,500 MX PESOS.",
                information: "HSBC have an option to do fast transfer without register the beneficiary for 11,000 pesos. The process to do SPEI with high amount is the same, but in that case will need to register the beneficiary that until approval can take 3 hours.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/95/2b/sDP0p1sl_t.png",
                    st1_text: "Client need to open the Super Wallet App.", 
                    st2_pic: "https://thumbs2.imgbox.com/9c/0a/R4MLNODb_t.png",
                    st2_text: "The client must click on the button on the middle: Transfer.",
                    st3_pic: "https://thumbs2.imgbox.com/9d/fa/AWV96sW3_t.png",
                    st3_text: "The screen will have the option to select to transfer to other bank or same bank.",
                    st4_pic: "https://thumbs2.imgbox.com/50/78/UwcbrNvq_t.png",
                    st4_text: "For high amount the client need to register the beneficiary, in our case will continue to Transferencia Express (limited to 11,000 pesos).", 
                    st5_pic: "https://thumbs2.imgbox.com/ec/a6/lFPXhmvp_t.png",
                    st5_text: "Confirm the data on the screen and continue to PIN code confirmation to see the receipt.",
                  }]
                }
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/ce/db/RKnFjevh_t.png",
                limits: "The debit card have 100% limit, but normally have a pattern for the HSBC card and payment limits with minimum and maximum per period, that are 8,000 to 29,500 MX PESOS.",
                information: "Most of the HSBC cards nowasday dont have numbers, so for online shopping the client just can use the virtual card that can be generate on the HSBC App.",
                steps: {
                  create: [{ 
                    st1_pic: "https://thumbs2.imgbox.com/f5/f5/G9r2DmN0_t.png",
                    st1_text: "The client must start openning the HSBC App.", 
                    st2_pic: "https://thumbs2.imgbox.com/6a/e6/IQDq8JIN_t.png",
                    st2_text: "The client need to select the account that will be used for the payment. Nomina for debit card or Tarjeta de Credito.",	
                    st3_pic: "https://thumbs2.imgbox.com/bf/b5/qr2XduVJ_t.png",
                    st3_text: "In the case of the debit card, below the client balance account have the button to create the virtual card.",
                    st4_pic: "https://thumbs2.imgbox.com/e0/7a/KaVdKqOW_t.png",
                    st4_text: "Confirm that you want to create the virtual card",
                    st5_pic: "https://thumbs2.imgbox.com/b7/1d/6cVHcLo2_t.png",
                    st5_text: "The screen to the client confirm the details of the physical card that will be associated with the virtual card.",
                    st6_pic: "https://thumbs2.imgbox.com/8d/98/EBfLnsJb_t.png",
                    st6_text: "The virtual card is generate and to see the data of the card the client must click on the button on the bottom of the screen."
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/85/06/Z1bkNUUV_t.jpg",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the HSBC card and payment limits that are 8,000 to 29,500 MX PESOS. The client can check the credit limit by online bank or app.",
                information: "Most of the HSBC cards nowasday dont have numbers, so for online shopping the client just can use the virtual card that can be generate on the HSBC App.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/f5/f5/G9r2DmN0_t.png",
                    st1_text: "The client must start openning the HSBC App.", 
                    st2_pic: "https://thumbs2.imgbox.com/6a/e6/IQDq8JIN_t.png",
                    st2_text: "The client need to select the account that will be used for the payment. Nomina for debit card or Tarjeta de Credito.",	
                    st3_pic: "https://thumbs2.imgbox.com/bf/b5/qr2XduVJ_t.png",
                    st3_text: "In the case of the debit card, below the client balance account have the button to create the virtual card.",
                    st4_pic: "https://thumbs2.imgbox.com/e0/7a/KaVdKqOW_t.png",
                    st4_text: "Confirm that you want to create the virtual card",
                    st5_pic: "https://thumbs2.imgbox.com/b7/1d/6cVHcLo2_t.png",
                    st5_text: "The screen to the client confirm the details of the physical card that will be associated with the virtual card.",
                    st6_pic: "https://thumbs2.imgbox.com/8d/98/EBfLnsJb_t.png",
                    st6_text: "The virtual card is generate and to see the data of the card the client must click on the button on the bottom of the screen."
                  }]
                },
              }]
            }
          },
          {
            name: "CITIBANAMEX",
            logo: "https://thumbs2.imgbox.com/98/fb/rwuWRFgO_t.jpg",
            payment: {
              create: [
                {
                  type: "netkey",
                  symbol: "https://thumbs2.imgbox.com/27/f4/OPsA1x5W_t.png",
                  limits: "Information how to activate the NetKey",
                  information: "Excepcional step by step how to activate the NetKey. The client will need to activate the NetKey on a bank branch, so later will activate the NetKey on the Citi Movil.",
                  steps: {
                    create: [{
                      st1_pic: "https://thumbs2.imgbox.com/f0/8a/8vu9aVci_t.png",
                      st1_text: "When the client open the Citi App and before to enter the password, need to click on the button on the botton left of the screen to generate the NetKey.", 
                      st2_pic: "https://thumbs2.imgbox.com/b4/43/mrQOZyY9_t.png",
                      st2_text: "Client need to confirm that want to activate the NewKey",	
                      st3_pic: "https://thumbs2.imgbox.com/ad/22/7cV10ABd_t.png",
                      st3_text: "The bank will send SMS with 8 digits code to the client, will expired in 2 minutes.",
                      st4_pic: "https://thumbs2.imgbox.com/b8/c8/lDi5VDEX_t.png",
                      st4_text: "On smartphone the code will be fullfiled automatically.",
                      st5_pic: "https://thumbs2.imgbox.com/c0/10/dzFKVotk_t.png",
                      st5_text: "Now the client must asigned the Term and Service clicking on Aceitar. The client now is able to make transfer and shopping online using the dynamic CVV.",
                    }]
                  }
                },
                {
                type: "transfer",
                symbol: "https://thumbs2.imgbox.com/8a/3b/BYUcT2Oc_t.jpeg",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the Citibanamex card and payment limits that are 8,000 to 29,500 MX PESOS.",
                information: "For transfer confirmation the client will need to activate the NetKey on a bank branch, so later will consult the NetKey on the Citi Movil. Codi is the fast and easy way to do transfer in Mexico. If the user not registered the Codi before, the steps will be the same, but after to ask for registration the client will receive a SMS code to proceed.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/43/0b/9gnf3ATc_t.png",
                    st1_text: "When the client open the Citi Movil and before to enter the password will see the Codi option.", 
                    st2_pic: "https://thumbs2.imgbox.com/89/bf/2em8QAOq_t.png",
                    st2_text: "After the client enter the password will show already the option to Send Money. If the client want to do a transfer, must click on Enviar dinero.",
                    st3_pic: "https://thumbs2.imgbox.com/70/fe/9ClrsrpZ_t.png",
                    st3_text: "Time to scan the QR code or select from the galery if the client saved the QR code on the phone.",
                    st4_pic: "https://thumbs2.imgbox.com/c3/37/rJsPzZvR_t.png",
                    st4_text: "Must select the account that will be debited. ", 
                    st5_pic: "https://thumbs2.imgbox.com/38/46/WUoWyOUW_t.png",
                    st5_text: "Client must select Pay Today, confirm the information and continue.",
                    st6_pic: "https://thumbs2.imgbox.com/ad/5b/P8j8eUdH_t.png",
                    st6_text: "Time to enter the KeyNet that is auto generate if the user activated the NetKey. Done, now the client can see the receipt of the transaction.",
                  }]
                }
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/1c/fb/rCKW0C5E_t.png",
                limits: "The debit card have 100% limit, but normally have a pattern for the HSBC card and payment limits with minimum and maximum per period, that are 8,000 to 29,500 MX PESOS.",
                information: "Most of the HSBC cards nowasday dont have numbers, so for online shopping the client just can use the virtual card that can be generate on the HSBC App. The steps show how to handle the activation of the NetKey, necessary to confirm online shopping or online transfer.",
                steps: {
                  create: [{ 
                    st1_pic: "https://thumbs2.imgbox.com/f0/8a/8vu9aVci_t.png",
                    st1_text: "When the client open the Citi App and before to enter the password, need to click on the button on the botton left of the screen to generate the NetKey.", 
                    st2_pic: "https://thumbs2.imgbox.com/b4/43/mrQOZyY9_t.png",
                    st2_text: "Client need to confirm that want to activate the NewKey",	
                    st3_pic: "https://thumbs2.imgbox.com/ad/22/7cV10ABd_t.png",
                    st3_text: "The bank will send SMS with 8 digits code to the client, will expired in 2 minutes.",
                    st4_pic: "https://thumbs2.imgbox.com/b8/c8/lDi5VDEX_t.png",
                    st4_text: "On smartphone the code will be fullfiled automatically.",
                    st5_pic: "https://thumbs2.imgbox.com/c0/10/dzFKVotk_t.png",
                    st5_text: "Now the client must asigned the Term and Service clicking on Aceitar. The client now is able to make transfer and shopping online using the dynamic CVV.",
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/af/a7/lgB6nlmp_t.png",
                limits: "The limits will depends of the incomes of the client, but normally have a pattern for the HSBC card and payment limits that are 8,000 to 29,500 MX PESOS. The client can check the credit limit by online bank or app.",
                information: "Most of the HSBC cards nowasday dont have numbers, so for online shopping the client just can use the virtual card that can be generate on the HSBC App.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/f5/f5/G9r2DmN0_t.png",
                    st1_text: "The client must start openning the HSBC App.", 
                    st2_pic: "https://thumbs2.imgbox.com/6a/e6/IQDq8JIN_t.png",
                    st2_text: "The client need to select the account that will be used for the payment. Nomina for debit card or Tarjeta de Credito.",	
                    st3_pic: "https://thumbs2.imgbox.com/bf/b5/qr2XduVJ_t.png",
                    st3_text: "In the case of the debit card, below the client balance account have the button to create the virtual card.",
                    st4_pic: "https://thumbs2.imgbox.com/e0/7a/KaVdKqOW_t.png",
                    st4_text: "Confirm that you want to create the virtual card",
                    st5_pic: "https://thumbs2.imgbox.com/b7/1d/6cVHcLo2_t.png",
                    st5_text: "The screen to the client confirm the details of the physical card that will be associated with the virtual card.",
                    st6_pic: "https://thumbs2.imgbox.com/8d/98/EBfLnsJb_t.png",
                    st6_text: "The virtual card is generate and to see the data of the card the client must click on the button on the bottom of the screen."
                  }]
                },
              }]
            }
          },
        ],
      }
    },
  });
  
    /* Peru */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Peru",
      flag: "https://flagicons.lipis.dev/flags/4x3/pe.svg",
      banks: {
        create: [{
          name: "Santander",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        }]
      }
    },
  });

  /* Argentina */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Argentina",
      flag: "https://flagicons.lipis.dev/flags/4x3/ar.svg",
      banks: {
        create: [{
          name: "Santander",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        }, 
       {
          name: "Itau",
          logo: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/97f45217072303.562b554a0d901.jpg",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        }, {
          name: "Bradesco",
          logo: "https://www.logotypes101.com/logos/40/CA8543BA7AB6ECA1FC0F97A942A51A50/Bradesco.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        } ]
      }
    },
  });

    /* Bolivia */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Bolivia",
      flag: "https://flagicons.lipis.dev/flags/4x3/bo.svg",
      banks: {
        create: [{
          name: "Santander",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        }]
      }
    },
  });
  
    /* Colombia */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Colombia",
      flag: "https://flagicons.lipis.dev/flags/4x3/co.svg",
      banks: {
        create: [{
          name: "Santander",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        }]
      }
    },
  });
  
    /* Guatemala */
  await prisma1.country.create({
    data: {
      userId: user.id,
      country: "Guatemala",
      flag: "https://flagicons.lipis.dev/flags/4x3/sv.svg",
      banks: {
        create: [{
          name: "Santander",
          logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
          payment: {
            create: [{
              type: "transfer",
              symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                  st1_text: "Open BR Santander App and choose Transfer option",
                  st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                  st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                }]
              },
            },
            {
              type: "debit",
              symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              }
            },
            {
              type: "credit",
              symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
              limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
              information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
              steps: {
                create: [{
                  st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                  st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                  st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                  st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                }]
              },
            }]
          }
        }]
      }
    },
  });

    /* El Salvador */
    await prisma1.country.create({
      data: {
        userId: user.id,
        country: "El Salvador",
        flag: "https://flagicons.lipis.dev/flags/4x3/sv.svg",
        banks: {
          create: [{
            name: "Santander",
            logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
            payment: {
              create: [{
                type: "transfer",
                symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                    st1_text: "Open BR Santander App and choose Transfer option",
                    st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                    st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                  }]
                },
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                },
              }]
            }
          }]
        }
      },
    });

    /* Ecuador */
    await prisma1.country.create({
      data: {
        userId: user.id,
        country: "Ecuador",
        flag: "https://flagicons.lipis.dev/flags/4x3/ec.svg",
        banks: {
          create: [{
            name: "Santander",
            logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
            payment: {
              create: [{
                type: "transfer",
                symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                    st1_text: "Open BR Santander App and choose Transfer option",
                    st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                    st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                  }]
                },
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                },
              }]
            }
          }]
        }
      },
    });

      /* Honduras */
      await prisma1.country.create({
      data: {
        userId: user.id,
        country: "Honduras",
        flag: "https://flagicons.lipis.dev/flags/4x3/hn.svg",
        banks: {
          create: [{
            name: "Santander",
            logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
            payment: {
              create: [{
                type: "transfer",
                symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                    st1_text: "Open BR Santander App and choose Transfer option",
                    st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                    st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                  }]
                },
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                },
              }]
            }
          }]
        }
      },
    });

      /* Costa Rica */
      await prisma1.country.create({
      data: {
        userId: user.id,
        country: "Costa Rica",
        flag: "https://flagicons.lipis.dev/flags/4x3/cr.svg",
        banks: {
          create: [{
            name: "Santander",
            logo: "https://thumbs2.imgbox.com/ef/aa/Kv6AZKQK_t.png",
            payment: {
              create: [{
                type: "transfer",
                symbol: "https://logospng.org/download/pix/logo-pix-1024.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://cms.santander.com.br/sites/WPS/imagem/imagem-app-nova-conheca-vitrine-1/19-09-13_193835_P_banner_800x530_home.png",
                    st1_text: "Open BR Santander App and choose Transfer option",
                    st2_pic: "https://s2-techtudo.glbimg.com/T2hWbkeywWNH0ZsOHPw0cJoTgAw=/0x0:695x595/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/N/k/A44Vv8RleE2CkxbIYIkQ/techtudo1.jpg",
                    st2_text: "Select Pix option and click on the Código QR to scan the code (if you have the client on the phone, remember that the client need to handle the camera to scan the code from your plataform), finish to fulfill the transfer anc click on continue util the code input to confirm the transfer."
                  }]
                },
              },
              {
                type: "debit",
                symbol: "https://thumbs2.imgbox.com/b0/24/MfVjoT8P_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                }
              },
              {
                type: "credit",
                symbol: "https://thumbs2.imgbox.com/03/e9/uS3P9rSP_t.png",
                limits: "BRL 10,000/day (individuals) and BRL 50,000/day (legal entities);",
                information: "Work with high amount if the client register the beneficiary. Have a block after 8:00h PM (Brazilian timezone) for high amount.",
                steps: {
                  create: [{
                    st1_pic: "https://thumbs2.imgbox.com/21/c8/cWfZvRdt_t.png",
                    st1_text: "How to allow internet shopping with Debit card? After the user login on his Santander App the user must click on Option (Opção).",
                    st2_pic: "https://thumbs2.imgbox.com/f7/90/NMw8I5N1_t.png",
                    st2_text: "In the bottom of the screen, click on the option to Allow Compra na Internet, verify the best PSP for this card."
                  }]
                },
              }]
            }
          }]
        }
      },
    });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma1.$disconnect();
  });
