import { getDictionary } from '@/lib/api';
import { getTrans } from '@/lib/utils';
import { Lang } from '@/lib/types';
import TempleHistoryCard from '@/components/TempleHistoryCard';
import HistoricalTimeline from '@/components/HistoricalTimeline';

export default async function HistoryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);

    const pageTitle = lang === 'hi' ? 'मंदिर का गौरवशाली इतिहास' : 'Temple\'s Glorious History';
    const pageSubtitle = lang === 'hi'
        ? '11वीं सदी ईस्वी में स्थापित यह मंदिर जैन समुदाय की आस्था का केंद्र है।'
        : 'Established in the 11th century CE, this temple is the center of faith for the Jain community.';

    // Timeline events
    const timelineEvents = lang === 'hi' ? [
        {
            year: '947 ईस्वी',
            title: 'स्थापना की शुरुआत',
            description: 'सीमंदर शाह ने केरापुरपट्टन में व्यापार शुरू किया और भाग्य से धन प्राप्त किया।'
        },
        {
            year: '972 ईस्वी',
            title: 'मंदिर प्रतिष्ठा',
            description: 'आचार्य यशोभद्रविजय द्वारा पांचों जिनालयों की भव्य प्रतिष्ठा सम्पन्न हुई।'
        },
        {
            year: '1941-1948',
            title: 'महान जीर्णोद्धार',
            description: 'सात वर्षों तक चला व्यापक जीर्णोद्धार कार्य, जिसे गुजरात के श्रेष्ठियों ने प्रायोजित किया।'
        },
        {
            year: 'वर्तमान',
            title: 'यूनेस्को विश्व धरोहर',
            description: 'चित्तौड़गढ़ किला यूनेस्को विश्व धरोहर स्थल के रूप में मान्यता प्राप्त है।'
        }
    ] : [
        {
            year: '947 CE',
            title: 'Foundation Begins',
            description: 'Simandar Shah started trade in Kerapurpattan and acquired wealth through fortune.'
        },
        {
            year: '972 CE',
            title: 'Temple Consecration',
            description: 'Grand consecration of all five Jinalayas by Acharya Yashobhadravijay.'
        },
        {
            year: '1941-1948',
            title: 'Major Renovation',
            description: 'Seven-year extensive renovation work sponsored by merchants from Gujarat.'
        },
        {
            year: 'Present',
            title: 'UNESCO World Heritage',
            description: 'Chittorgarh Fort recognized as a UNESCO World Heritage Site.'
        }
    ];

    // Temple data - organized by category
    const fortTemples = lang === 'hi' ? [
        {
            title: '1. श्री सातबीस देवरी के जैन मंदिर',
            period: '972 ईस्वी',
            summary: 'चित्तौड़गढ़ दुर्ग के सभी मंदिरों में सबसे प्रसिद्ध, यह मंदिर अपने भव्य आकर्षक रूप में आज भी जैन धर्म के गौरव की गाथा कह रहा है।',
            details: `सीमंदर शाह नाम के एक ब्राह्मण हलवाई ने वि. सं. 1004 (सन् 947) में केरापुरपट्टन में व्यापार शुरू किया। भाग्य से मिली लक्ष्मी के साथ, आचार्य यशोभद्र सूरि के मार्गदर्शन में उन्होंने पांच स्थानों पर जैन पंचतीर्थ बनवाए।

सन् 957 में निर्माण कार्य प्रारंभ हुआ और 15 वर्षों में सन् 972 में पूर्ण हुआ। वैशाख सुदी एकम् सम्वत् 1029 (सन् 972) को पांचों जिनालयों की प्रतिष्ठा एक ही दिन सम्पन्न हुई।

मंदिर में तीन मण्डप हैं और चारों ओर गलियारों में 26 देवरियाँ होने से इसे सातबीस देवरी कहा जाता है। मूल मंदिर में गर्भगृह, अन्तराल, सभा मण्डप युक्त है। मूलनायक आदिनाथ भगवान के साथ 47 पाषाण मूर्तियाँ हैं।

मंदिर की बाहरी दीवारों पर विविध प्रकार की शिल्पकारी स्तब्धकारी है। सम्पूर्ण मंदिर में 163 पत्थर के कलात्मक स्तंभ हैं जो मेवाड़-देलवाड़ा, रणकपुर की शिल्प कला के समान हैं।`
        },
        {
            title: '2. चैमुखा भगवान का मंदिर',
            period: '1491 सं.',
            summary: 'गौमुख कुण्ड पर स्थित यह चैमुखा पाश्र्वनाथ भगवान का मंदिर अपनी अनूठी वास्तुकला के लिए प्रसिद्ध है।',
            details: 'गौमुख कुण्ड पर सुकोशल मुनि के मंदिर के ऊपर स्थित इस चैमुखे मंदिर को चैमुखा पाश्र्वनाथ भगवान का मंदिर कहा जाता है। एक प्रतिमा पर 1491 सं. का लेख है।'
        },
        {
            title: '3. गौमुख कुण्ड के पास सुकौशलमुनिजी का मंदिर',
            period: '1543 सं.',
            summary: 'किले पर गौमुख कुण्ड के पास स्थित इस मंदिर में श्री पाश्र्वनाथ, श्री कीर्तिधर मुनि और श्री सुकौशलमुनिजी की प्रतिमाएं हैं।',
            details: 'एक कमरे में दीवार पर एक ही पाषाण पर बनी हुई श्री पाश्र्वनाथ, श्री कीर्तिधर मुनि, श्री सुकौशलमुनिजी की 9" की प्रतिमाओं के पास ही सिंहनी की मूर्ति है। ऊपर कन्नड़ भाषा में लेख उत्कीर्ण है व एक लेख प्राकृत में सं. 1543 में जिनसमुद्रसूरि द्वारा प्रतिष्ठा का है।'
        }
    ] : [
        {
            title: '1. Shri Satbis Deori Jain Temples',
            period: '972 CE',
            summary: 'The most famous among all temples in Chittorgarh Fort, this temple continues to narrate the glory of Jainism in its magnificent form.',
            details: `A Brahmin confectioner named Simandar Shah started trade in Kerapurpattan in 947 CE. With wealth acquired through fortune, under the guidance of Acharya Yashobhadra Suri, he built Jain Panchtirth at five locations.

Construction began in 957 CE and was completed in 972 CE after 15 years. The consecration of all five Jinalayas was completed on the same day - Vaishakh Sudi Ekam Samvat 1029 (972 CE).

The temple has three mandaps and 26 shrines in corridors around it, hence called Satbis Deori (Twenty-Seven Shrines). The main temple includes sanctum, antarala, and assembly hall. Along with Lord Adinath as the main deity, there are 47 stone idols.

The exterior walls feature stunning craftsmanship. The entire temple has 163 artistic stone pillars similar to the sculptural art of Mewar-Delwara and Ranakpur.`
        },
        {
            title: '2. Chaumukha Bhagwan Temple',
            period: '1491 VS',
            summary: 'Located at Gaumukh Kund, this four-faced Parshvanath temple is renowned for its unique architecture.',
            details: 'Located above Sukoshal Muni\'s temple at Gaumukh Kund, this four-faced temple is called Chaumukha Parshvanath Bhagwan Temple. One idol bears an inscription dated 1491 VS.'
        },
        {
            title: '3. Sukoshalmunji Temple near Gaumukh Kund',
            period: '1543 VS',
            summary: 'Located near Gaumukh Kund in the fort, this temple houses idols of Shri Parshvanath, Shri Kirtidhar Muni, and Shri Sukoshalmuniji.',
            details: 'In one room, on a single stone carved on the wall, there are 9" idols of Shri Parshvanath, Shri Kirtidhar Muni, and Shri Sukoshalmuniji, along with a lioness sculpture. An inscription in Kannada language is engraved above, and a Prakrit inscription mentions consecration by Jinsamudrasuri in 1543 VS.'
        }
    ];

    const cityTemples = lang === 'hi' ? [
        {
            title: '4. धीमों का मंदिर',
            period: '400 वर्ष पुराना',
            summary: '400 वर्ष पुराना यह जैन मंदिर दुर्ग की तलहटी में शहर के जूना बाजार में स्थित है।',
            details: `इसे धीग गौत्र वालों ने बनवाया था। प्रवेश द्वार की कलात्मक छतरी पर चार कोनों पर चार धीग श्रावक बैठे हुए दर्शाए गए हैं।

पहला जीर्णोद्वार सं 1887 में एवं बाद का महाराणा सज्जन सिंह के समय सं 1941 की पोष बदी आठम को पूर्ण हुआ। मंदिर की सेवा पूजा हेतु सन 1981 में 'श्री जैन श्वेताम्बर ऋषभदेव ट्रस्ट मंदिर, चित्तौड़गढ़' की स्थापना की गई।

वैशाख सुदी छठ सं 2050 (28.4.1993) को भव्य समारोह के साथ प्रतिष्ठा सम्पन्न हुई।`
        },
        {
            title: '5. श्री हरिभद्रसूरि स्मृति मंदिर',
            period: '1973',
            summary: '1444 ग्रंथों के रचयिता आचार्य हरिभद्रसूरि जी के महान अवदान को देखते हुए उनका स्मृति मंदिर निर्मित किया गया।',
            details: `यह चार मंजिला मंदिर है। प्रथम मंजिल पर उपाश्रय व ज्ञान भंडार है। द्वितीय मंजिल पर श्री हरिभद्रसूरि जी की 41" की भव्य प्रतिमा के साथ उनकी धर्म माता साध्वी श्री याकिनी महत्तरा और अन्य आचार्यों की प्रतिमाएँ हैं।

पद्मश्री मुनि जिन विजय जी ने अपनी स्व अर्जित पूंजी से निर्मित करवाया। प्रतिष्ठा 15.2.73 को आचार्य श्री उदयसागरजी म. सा. की निश्रा में हुई।`
        }
    ] : [
        {
            title: '4. Dhimo Temple',
            period: '400 Years Old',
            summary: 'This 400-year-old Jain temple is located in Juna Bazaar at the foot of the fort.',
            details: `Built by the Dhig gotra community. The artistic canopy at the entrance depicts four Dhig devotees seated at the four corners.

The first renovation was completed in 1887 VS, and the later one during Maharana Sajjan Singh's time on Posh Vadi Aatham 1941 VS. In 1981, 'Shri Jain Shwetambar Rishabdev Trust Temple, Chittorgarh' was established for temple service.

Grand consecration was completed on Vaishakh Sudi Chhath 2050 VS (28.4.1993).`
        },
        {
            title: '5. Shri Haribhadrasuri Memorial Temple',
            period: '1973',
            summary: 'Built in memory of Acharya Haribhadrasuri, author of 1444 texts, recognizing his great contribution.',
            details: `This is a four-story temple. The first floor has an upashraya and knowledge repository. The second floor features a magnificent 41" idol of Shri Haribhadrasuri along with idols of his dharma mother Sadhvi Shri Yakini Mahattara and other acharyas.

Built by Padma Shri Muni Jin Vijay Ji from his self-earned capital. Consecration was performed on 15.2.73 under the guidance of Acharya Shri Udaysagarji M. Sa.`
        }
    ];

    const digambarTemples = lang === 'hi' ? [
        {
            title: '9. दुर्ग पर मल्लिनाथ भगवान का मंदिर',
            period: '1428 ई.',
            summary: 'कीर्तिस्तंभ के समीप स्थित यह दिगम्बर मंदिर "महावीर प्रासाद" के नाम से प्रसिद्ध है।',
            details: `महाराणा हमीर के समय मूलतः यह चंद्रप्रभु जिनालय था। अलाउद्दीन खिलजी के आक्रमण के समय मूल मंदिर खंडित कर दिया गया था।

ई. 1428 में श्वेताम्बर श्रेष्ठी गुणराज ने सोमदेवसूरि के हाथों जीर्णोद्धार कर प्रतिष्ठा करवाई। बाद में ई. 1979 में दिगम्बर श्रेष्ठी ने जीर्णोद्धार करवाया। आज भगवान श्री मल्लिनाथ जी की मूर्ति विराजित है।`
        },
        {
            title: '11. श्री सुपाश्र्वनाथ दिगम्बर जैन मंदिर',
            period: '2005',
            summary: 'श्री दिगम्बर जैन समाज द्वारा निर्मित इस सुन्दर मंदिर की प्रतिष्ठा दिसम्बर 2005 में हुई।',
            details: 'मुनिपुंगव श्री सुधासागर जी म. सा. की निश्रा में प्रतिष्ठा सम्पन्न हुई। यह मंदिर दिगम्बर समाज की सभी गतिविधियों का केन्द्र बन गया है।'
        }
    ] : [
        {
            title: '9. Mallinath Bhagwan Temple on Fort',
            period: '1428 CE',
            summary: 'Located near Kirti Stambh, this Digambar temple is famous as "Mahavir Prasad".',
            details: `During Maharana Hamir's time, this was originally Chandraprabhu Jinalaya. The original temple was destroyed during Alauddin Khilji's invasion.

In 1428 CE, Shwetambar merchant Gunraj renovated and consecrated it through Somadev Suri. Later in 1979 CE, Digambar merchants renovated it. Today, the idol of Lord Mallinath is enshrined.`
        },
        {
            title: '11. Shri Suparshvanath Digambar Jain Temple',
            period: '2005',
            summary: 'This beautiful temple built by the Digambar Jain community was consecrated in December 2005.',
            details: 'Consecration was completed under the guidance of Munipungav Shri Sudhasagar Ji M. Sa. This temple has become the center of all activities of the Digambar community.'
        }
    ];

    const monuments = lang === 'hi' ? [
        {
            title: '13. कीर्ति स्तंभ',
            period: '11-12वीं शताब्दी',
            summary: 'जैन गौरव का यह अद्भुत कीर्ति-स्तंभ 76\' ऊँचा है जो भगवान आदिनाथ को समर्पित है।',
            details: `76' ऊँचा, 32' धरातलीय व्यास, 15' ऊपरी व्यास व 69 सीढ़ियों एवं सात मंजिलों से युक्त है। महाराणा कुम्भा द्वारा विजय-स्तंभ का निर्माण इसी की अनुकृति की तरह करवाया गया था।

इसका निर्माण श्रेष्ठी नय के पुत्र जीजा एवं उसके पुत्र पुण्यसिंह ने (11-12 वीं शताब्दी) में किया था, जो बघेरवाल दिगम्बर जैन थे।

जीर्णोद्धार सं. 1485-1495 में श्रेष्ठि गुणराज के पुत्र वाल ने करवाया एवं तीन जिन प्रतिमाओं की प्रतिष्ठा मुनि सोमसुन्दर सूरि से करवाई थी।`
        }
    ] : [
        {
            title: '13. Kirti Stambh (Tower of Fame)',
            period: '11-12th Century',
            summary: 'This magnificent tower of Jain glory stands 76\' tall, dedicated to Lord Adinath.',
            details: `76' high, 32' ground diameter, 15' upper diameter with 69 steps and seven floors. Maharana Kumbha's Vijay Stambh was built as a replica of this.

Built by Jija, son of merchant Nay, and his son Punyasingh (11-12th century), who were Bagherwal Digambar Jains.

Renovation was done by Val, son of merchant Gunraj in 1485-1495 VS, and three Jin idols were consecrated by Muni Somasundar Suri.`
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-jain-orange/10 via-amber-50 to-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-stone-gray mb-6">
                            {pageTitle}
                        </h1>
                        <div className="w-24 h-1.5 bg-jain-orange mx-auto mb-8" />
                        <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
                            {pageSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 md:py-20 bg-stone-50">
                <div className="max-w-6xl mx-auto px-6 md:px-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-gray mb-4">
                            {lang === 'hi' ? 'ऐतिहासिक समयरेखा' : 'Historical Timeline'}
                        </h2>
                        <div className="w-20 h-1.5 bg-jain-orange mx-auto" />
                    </div>
                    <HistoricalTimeline events={timelineEvents} />
                </div>
            </section>

            {/* Fort Temples Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-gray mb-3">
                            {lang === 'hi' ? 'किले के मंदिर' : 'Fort Temples'}
                        </h2>
                        <p className="text-stone-600 text-justify">
                            {lang === 'hi' ? 'सात बीस देवरी परिसर' : 'Sat Bees Deori Complex'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {fortTemples.map((temple, index) => (
                            <TempleHistoryCard key={index} {...temple} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* City Temples Section */}
            <section className="py-16 md:py-20 bg-stone-50">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-gray mb-3">
                            {lang === 'hi' ? 'शहर के श्वेताम्बर मंदिर' : 'City Shwetambar Temples'}
                        </h2>
                        <p className="text-stone-600 text-justify">
                            {lang === 'hi' ? 'चित्तौड़गढ़ नगर में स्थित मंदिर' : 'Temples located in Chittorgarh city'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {cityTemples.map((temple, index) => (
                            <TempleHistoryCard key={index} {...temple} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Digambar Temples Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-gray mb-3">
                            {lang === 'hi' ? 'दिगम्बर जैन मंदिर' : 'Digambar Jain Temples'}
                        </h2>
                        <p className="text-stone-600 text-justify">
                            {lang === 'hi' ? 'दिगम्बर परंपरा के पवित्र स्थल' : 'Sacred sites of Digambar tradition'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {digambarTemples.map((temple, index) => (
                            <TempleHistoryCard key={index} {...temple} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Monuments Section */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-stone-50 to-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-gray mb-3">
                            {lang === 'hi' ? 'स्मारक' : 'Monuments'}
                        </h2>
                        <p className="text-stone-600 text-justify">
                            {lang === 'hi' ? 'जैन वास्तुकला के अद्भुत नमूने' : 'Magnificent examples of Jain architecture'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {monuments.map((monument, index) => (
                            <TempleHistoryCard key={index} {...monument} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Note Section */}
            <section className="py-12 bg-jain-orange/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-stone-600 text-sm leading-relaxed text-justify">
                        {lang === 'hi'
                            ? 'यह केवल मुख्य मंदिरों का संक्षिप्त विवरण है। चित्तौड़गढ़ में और भी कई ऐतिहासिक जैन मंदिर हैं जो हमारी समृद्ध विरासत का प्रतिनिधित्व करते हैं।'
                            : 'This is a brief description of the main temples. There are many more historical Jain temples in Chittorgarh that represent our rich heritage.'
                        }
                    </p>
                </div>
            </section>
        </div>
    );
}
