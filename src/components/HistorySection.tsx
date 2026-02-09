import { getTrans } from '@/lib/utils';
import { Lang } from '@/lib/types';
import TempleHistoryCard from '@/components/TempleHistoryCard';
import HistoricalTimeline from '@/components/HistoricalTimeline';

interface HistorySectionProps {
    lang: string;
    dict: any;
}

export default function HistorySection({ lang, dict }: HistorySectionProps) {
    const pageTitle = lang === 'hi' ? 'इतिहास और गौरवशाली विरासत' : 'History and Glorious Heritage';
    const pageSubtitle = lang === 'hi'
        ? 'चित्तौड़गढ़ की यह पावन धरा शक्ति, भक्ति और जैन वैभव का अद्भुत संगम है, जहाँ सदियों का इतिहास पत्थर की दीवारों पर अंकित है।'
        : 'This holy land of Chittorgarh is a magnificent confluence of power, devotion, and Jain splendor, where centuries of history are inscribed on stone walls.';

    const timelineEvents = lang === 'hi' ? [
        {
            year: '300 ई.पू.',
            title: 'माध्यमिका का उत्थान',
            description: 'सम्राट अशोक के पौत्र संप्रति के समय आर्य परिवर्तन ने माध्यमिका (नगरी) को अपना केंद्र बनाया।'
        },
        {
            year: 'चौथी शताब्दी',
            title: 'श्रीजनपद की राजधानी',
            description: 'महाभारत काल से प्रसिद्ध श्रीजनपद की राजधानी माध्यमिका नगरी अपने चरम वैभव पर थी।'
        },
        {
            year: '947 ईस्वी',
            title: 'सीमंदर शाह का आगमन',
            description: 'सीमंदर शाह ने केरापुरपट्टन में व्यापार प्रारंभ किया और भाग्य से अपार लक्ष्मी प्राप्त की।'
        },
        {
            year: '972 ईस्वी',
            title: 'पंचतीर्थ प्रतिष्ठा',
            description: 'आचार्य यशोभद्र सूरि के मार्गदर्शन में चित्तौड़गढ़ सहित पांच तीर्थों की भव्य प्रतिष्ठा सम्पन्न हुई।'
        },
        {
            year: '1175 ईस्वी',
            title: 'शांतिनाथ मंदिर',
            description: 'रत्नेश्वर तालाब के पास भगवान शांतिनाथ जी के कलात्मक मंदिर का निर्माण।'
        },
        {
            year: '1448 ईस्वी',
            title: 'भंडारी वेला का योगदान',
            description: 'भंडारी श्रेष्ठी वेला द्वारा उत्तर दिशा के पाश्र्वनाथ प्रभु मंदिर का निर्माण कराया गया।'
        },
        {
            year: '1530 ईस्वी',
            title: 'कर्माशाह दोशी का युग',
            description: 'कर्माशाह दोशी द्वारा दक्षिण दिशा के पाश्र्वनाथ मंदिर का भव्य निर्माण कराया गया।'
        },
        {
            year: '1973 ईस्वी',
            title: 'हरिभद्रसूरि स्मृति',
            description: '1444 ग्रंथों के रचयिता आचार्य हरिभद्रसूरि जी के स्मृति मंदिर की प्रतिष्ठा।'
        }
    ] : [
        {
            year: '300 BCE',
            title: 'Rise of Madhyamika',
            description: 'Arya Parivartan made Madhyamika (Nagari) his center during the reign of Ashoka\'s grandson, Samprati.'
        },
        {
            year: '4th Century',
            title: 'Capital of Shrijanpad',
            description: 'Madhyamika Nagari, the capital of Shrijanpad since the Mahabharata era, was at its peak.'
        },
        {
            year: '947 CE',
            title: 'Arrival of Simandar Shah',
            description: 'Simandar Shah started trade in Kerapurpattan and acquired immense wealth through fortune.'
        },
        {
            year: '972 CE',
            title: 'Panch Tirth Consecration',
            description: 'Grand consecration of five pilgrimages including Chittorgarh under Acharya Yashobhadra Suri.'
        },
        {
            year: '1175 CE',
            title: 'Shantinath Temple',
            description: 'Construction of the artistic Lord Shantinath temple near Ratneshwar Lake.'
        },
        {
            year: '1448 CE',
            title: 'Bhandari Vella\'s Contribution',
            description: 'Construction of the Northern Parshvanath Temple by Bhandari Shresthi Vella.'
        },
        {
            year: '1530 CE',
            title: 'Era of Karmashah Doshi',
            description: 'Grand construction of the Southern Parshvanath Temple by Karmashah Doshi.'
        },
        {
            year: '1973 CE',
            title: 'Haribhadrasuri Memorial',
            description: 'Consecration of the memorial temple of Acharya Haribhadrasuri, author of 1444 texts.'
        }
    ];

    const fortTemples = lang === 'hi' ? [
        {
            title: '1. श्री सातबीस देवरी जैन मंदिर समूह',
            period: '972 ईस्वी (प्रतिष्ठा)',
            summary: '27 देवरियों से घिरा यह भव्य मंदिर परिसर जैन वास्तुकला की सात्विक सादगी और विपुल अलंकरण का साक्षी है।',
            details: `सीमंदर शाह ने आचार्य यशोभद्र सूरि के आशीर्वाद से सन 957 में इसका निर्माण प्रारंभ कर 972 ईस्वी में पूर्ण करवाया। बैशाख सूदी एकम संवत 1029 को पांचों जिनलयों की प्रतिष्ठा हुई। सीमंदर शाह ने मंदिर की नींव में मजबूती के लिए 4000 मन तेल ढलवाया था, जिससे उन्हें 'तलेसरा' गोत्र प्राप्त हुआ।

मंदिर के चारों ओर गलियारों में 26 देवरियाँ होने से इसे 'सातबीस देवरी' कहा जाता है। मुख्य मंदिर में गर्भगृह, अन्तराल और सभा मण्डप है, जहाँ मूलनायक आदिनाथ भगवान के साथ पाषाण की 47 मूर्तियाँ विराजित हैं।

मंदिर के जंघा भाग, तोरणद्वार और 163 कलात्मक स्तंभों पर की गई शिल्पकारी मेवाड़-रणकपुर के मंदिरों के समान भव्य है। गुंबज में 16 नर्तकियों और आदिनाथ भगवान की जीवन-लीला के दृश्य उत्कीर्ण हैं।`
        },
        {
            title: '2. उत्तराभिमुख पाश्र्वनाथ मंदिर (भंडारी वेला)',
            period: '1448 ईस्वी',
            summary: 'भंडारी श्रेष्ठी वेला द्वारा निर्मित यह मंदिर अपने बारीक शिल्प और आचार्यों की मूर्तियों के लिए प्रसिद्ध है।',
            details: `उत्तर दिशा में स्थित इस मंदिर का निर्माण 1448 ईस्वी में भंडारी वेला ने करवाया था, जिन्होंने श्रृंगार चंवरी का भी जीर्णोद्धार किया था।

इसके गंभारे के बाहर चित्तौड़ उद्धारक आचार्य विजय नीतिसूरिश्वरजी और युगान्तरकारी आचार्य हरिभद्र सूरिजी की भव्य मूर्तियाँ विराजित हैं। प्रवेश द्वार पर सन 1941 और 1980 के जीर्णोद्धार के शिलालेख अंकित हैं।`
        },
        {
            title: '3. दक्षिणाभिमुख पाश्र्वनाथ मंदिर (कर्माशाह दोशी)',
            period: '1530 ईस्वी',
            summary: 'तोलाशाह और उनके सुपुत्र कर्माशाह दोशी द्वारा निर्मित यह मंदिर भक्ति और त्याग का प्रतीक है।',
            details: `सन 1530 में निर्मित इस पूर्वाभिमुख मंदिर में तीन पाषाण मूर्तियां हैं। इसकी देवरी में माँ पद्मावती की अत्यंत सुंदर मूर्ति विराजित है। इस मंदिर की बाहरी दीवारों का शिल्प भी अत्यंत चमत्कृत करने वाला है।`
        },
        {
            title: '4. शांतिनाथ एवं महावीर स्वामी मंदिर',
            period: '1175 - 1444 ईस्वी',
            summary: 'रत्नेश्वर तालाब के समीप स्थित ये मंदिर अपनी प्राचीनता और शांत वातावरण के लिए जाने जाते हैं।',
            details: `रामपोल के पास रत्नेश्वर तालाब पर स्थित शांतिनाथ मंदिर का उल्लेख 1175 ईस्वी का है। भगवान शांतिनाथ की 31 इंच की प्रतिमा की प्रतिष्ठा 1444 ईस्वी में आचार्य सोमसुन्दर सूरि द्वारा की गई थी। यहाँ का वातावरण आध्यात्मिक शांति प्रदान करता है।`
        },
        {
            title: '5. चैमुखा पाश्र्वनाथ मंदिर',
            period: '1491 संवत',
            summary: 'गौमुख कुण्ड के समीप स्थित यह मंदिर अपने अनूठे पाषाण शिल्प और कन्नड़ शिलालेखों के लिए प्रसिद्ध है।',
            details: `गौमुख कुण्ड के पास सुकोशल मुनि मंदिर के ऊपर स्थित इस मंदिर में एक ही पाषाण पर श्री पाश्र्वनाथ, श्री कीर्तिधर मुनि और श्री सुकौशलमुनिजी की प्रतिमाएं उत्कीर्ण हैं। यहाँ कन्नड़ और प्राकृत भाषा के प्राचीन शिलालेख इतिहास की गवाही देते हैं।`
        }
    ] : [
        {
            title: '1. Shri Saat Bees Deori Temple Complex',
            period: '972 CE (Consecration)',
            summary: 'Surrounded by 27 shrines, this magnificent temple complex witnesses the spiritual simplicity and rich ornamentation of Jain architecture.',
            details: `Under the guidance of Acharya Yashobhadra Suri, Simandar Shah began construction in 957 CE and completed it in 972 CE. The consecration took place on Vaishakh Sudi Ekam Samvat 1029. Simandar Shah poured 4,000 mounds of oil into the foundation for strength, earning the 'Talesara' gotra.

The complex is called 'Saat Bees Deori' due to the 26 shrines in the corridors (7+20=27). The main temple houses Lord Adinath along with 47 stone idols.

The craftsmanship on the 163 artistic pillars and torans is as grand as the temples of Mewar-Ranakpur. The domes feature 16 dancers and scenes from Lord Adinath's life.`
        },
        {
            title: '2. Northern Parshvanath Temple (Bhandari Vella)',
            period: '1448 CE',
            summary: 'Built by Bhandari Shresthi Vella, this temple is famous for its fine craftsmanship and idols of great Acharyas.',
            details: `Located in the north, this temple was built in 1448 CE by Bhandari Vella, who also renovated Shringar Chauri.

Outside the sanctum are grand idols of Acharya Vijay Nitisurishwarji (the savior of Chittor) and Acharya Haribhadrasuri. Inscriptions at the entrance document renovations in 1941 and 1980.`
        },
        {
            title: '3. Southern Parshvanath Temple (Karmashah Doshi)',
            period: '1530 CE',
            summary: 'Built by Tolashah and his son Karmashah Doshi, this temple symbolizes devotion and sacrifice.',
            details: `Built in 1530 CE, this east-facing temple contains three stone idols. A beautiful idol of Goddess Padmavati is enshrined in its wing. The craftsmanship on the exterior walls is miraculous.`
        },
        {
            title: '4. Shantinath and Mahavir Swami Temples',
            period: '1175 - 1444 CE',
            summary: 'Located near Ratneshwar Lake, these temples are known for their antiquity and serene atmosphere.',
            details: `The Shantinath temple near Rampol and Ratneshwar Lake dates back to 1175 CE. The 31-inch idol of Lord Shantinath was consecrated in 1444 CE by Acharya Somasundara Suri. The environment provides profound spiritual peace.`
        },
        {
            title: '5. Chaumukha Parshvanath Temple',
            period: '1491 VS',
            summary: 'Located near Gaumukh Kund, this temple is famous for its unique stone craft and Kannada inscriptions.',
            details: `Situated above the Sukoshal Muni temple at Gaumukh Kund, this temple features idols of Shri Parshvanath, Shri Kirtidhar Muni, and Shri Sukoshalmuniji carved on a single stone. Ancient inscriptions in Kannada and Prakrit bear witness to its history.`
        }
    ];

    const cityTemples = lang === 'hi' ? [
        {
            title: '4. श्री ऋषभदेव मंदिर (धीमों का मंदिर)',
            period: '400 वर्ष पुराना',
            summary: "दुर्ग की तलहटी में स्थित यह मंदिर 'धीग' गोत्र के श्रावकों द्वारा श्रद्धापूर्वक बनाया गया था।",
            details: `चित्तौड़गढ़ नगर के जूना बाजार में स्थित इस मंदिर का निर्माण धीग (धीमों) गोत्र के श्रेष्ठियों ने करवाया था। प्रवेश द्वार की कलात्मक छतरी पर चार धीग श्रावक को बैठा हुआ दर्शाया गया है।

सन् 1887 और 1941 में इसके जीर्णोद्धार का कार्य पूर्ण हुआ। 1993 में भव्य प्रतिष्ठा के साथ यह मंदिर नगर के जैन समुदाय की आस्था का प्रमुख केंद्र बना हुआ है। यहाँ की सेवा-पूजा 'श्री जैन श्वेताम्बर ऋषभदेव ट्रस्ट' द्वारा की जाती है।`
        },
        {
            title: '5. श्री हरिभद्रसूरि स्मृति मंदिर',
            period: '1973 ईस्वी',
            summary: 'महान दार्शनिक आचार्य हरिभद्रसूरि जी की पावन स्मृति में निर्मित यह मंदिर ज्ञान और वैराग्य का केंद्र है।',
            details: `1444 ग्रंथों के अद्वितीय रचयिता आचार्य हरिभद्रसूरि जी का चित्तौड़गढ़ से गहरा नाता रहा है। उनकी स्मृति में यह चार मंजिला भव्य मंदिर पद्मश्री मुनि जिन विजय जी के प्रयासों से निर्मित किया गया।

द्वितीय मंजिल पर आचार्य श्री की 41 इंच की भव्य प्रतिमा के साथ उनकी धर्म माता साध्वी याकिनी महत्तरा की प्रतिमा विराजित है। यह स्थान शोधार्थियों और भक्तों के लिए प्रेरणा का स्रोत है।`
        }
    ] : [
        {
            title: '4. Shri Rishabhdev Temple (Dhimo Temple)',
            period: '400 Years Old',
            summary: "Located at the foot of the fort, this temple was built with devotion by the Shravaks of the \"Dhig\" gotra.",
            details: `Situated in Juna Bazaar of Chittorgarh city, this temple was built by the merchants of the Dhig (Dhimo) gotra. The entrance features an artistic canopy depicting four Dhig devotees.

Renovations were completed in 1887 and 1941. Since its grand consecration in 1993, it has been a major center of faith for the city's Jain community, managed by the 'Shri Jain Shwetambar Rishabhdev Trust'.`
        },
        {
            title: '5. Shri Haribhadrasuri Memorial Temple',
            period: '1973 CE',
            summary: 'Built in the holy memory of the great philosopher Acharya Haribhadrasuri, this temple is a center of knowledge and detachment.',
            details: `Acharya Haribhadrasuri, the author of 1444 unique texts, had a deep connection with Chittorgarh. This four-story grand memorial temple was built through the efforts of Padma Shri Muni Jin Vijay Ji.

The second floor houses a 41-inch magnificent idol of the Acharya along with his spiritual mother, Sadhvi Yakini Mahattara. It remains a source of inspiration for scholars and devotees.`
        }
    ];

    const digambarTemples = lang === 'hi' ? [
        {
            title: '9. श्री मल्लिनाथ भगवान मंदिर (महावीर प्रासाद)',
            period: '1428 ईस्वी',
            summary: 'कीर्ति स्तंभ के समीप स्थित यह मंदिर दिगम्बर परंपरा के प्राचीन वैभव को दर्शाता है।',
            details: `महाराणा हमीर के समय यह मूलतः चंद्रप्रभु जिनालय था। 1428 ईस्वी में श्वेताम्बर श्रेष्ठी गुणराज ने इसका जीर्णोद्धार कराया। बाद में 1979 में दिगम्बर समाज द्वारा पुनर्निर्माण के पश्चात आज यहाँ भगवान मल्लिनाथ जी की प्रतिमा विराजित है। इसे 'महावीर प्रासाद' के नाम से भी जाना जाता है।`
        },
        {
            title: '11. श्री सुपाश्र्वनाथ दिगम्बर जैन मंदिर',
            period: '2005 ईस्वी',
            summary: 'आधुनिक वास्तुशिल्प का यह सुंदर मंदिर दिगम्बर जैन समाज की धार्मिक गतिविधियों का प्रमुख केंद्र है।',
            details: `दिसंबर 2005 में मुनिपुंगव श्री सुधासागर जी महाराज की निश्रा में इस मंदिर की प्रतिष्ठा हुई। यह मंदिर अपनी शांति और भक्तिमय वातावरण के लिए भक्तों के बीच अत्यंत लोकप्रिय है।`
        }
    ] : [
        {
            title: '9. Shri Mallinath Bhagwan Temple (Mahavir Prasad)',
            period: '1428 CE',
            summary: 'Located near Kirti Stambh, this temple reflects the ancient glory of the Digambar tradition.',
            details: `Originally the Chandraprabhu Jinalaya during the time of Maharana Hamir, it was renovated by Shwetambar merchant Gunraj in 1428 CE. After reconstruction by the Digambar community in 1979, the idol of Lord Mallinath is enshrined here today. It is also known as 'Mahavir Prasad'.`
        },
        {
            title: '11. Shri Suparshvanath Digambar Jain Temple',
            period: '2005 CE',
            summary: 'This beautiful temple of modern architecture is a major center for the religious activities of the Digambar Jain community.',
            details: `Consecrated in December 2005 under the guidance of Munipungav Shri Sudhasagar Ji Maharaj, this temple is highly popular among devotees for its peace and devotional atmosphere.`
        }
    ];

    const monuments = lang === 'hi' ? [
        {
            title: '13. कीर्ति स्तंभ (जैन गौरव का प्रतीक)',
            period: '11वीं - 12वीं शताब्दी',
            summary: '76 फीट ऊँचा यह सात मंजिला स्तंभ भगवान आदिनाथ को समर्पित जैन स्थापत्य का विश्व प्रसिद्ध नमूना है।',
            details: `यह स्तंभ 76 फीट ऊँचा है, जिसका धरातलीय व्यास 32 फीट और ऊपरी व्यास 15 फीट है। इसमें 69 सीढ़ियां और सात मंजिलें हैं। इसका निर्माण बघेरवाल जैन श्रेष्ठी नय के पुत्र जीजा और उनके पुत्र पुण्य सिंह ने करवाया था।

महाराणा कुम्भा द्वारा निर्मित विजय स्तंभ इसी की अनुकृति माना जाता है। 12वीं सदी में राजा कुमारपाल और 15वीं सदी में श्रेष्ठी वाल ने इसका जीर्णोद्धार करवाया था। यह स्तंभ अचल और अमर जैन संस्कृति की विजय का उद्घोष करता है।`
        }
    ] : [
        {
            title: '13. Kirti Stambh (Tower of Fame)',
            period: '11th - 12th Century',
            summary: 'This 76-foot tall, seven-story tower dedicated to Lord Adinath is a world-famous example of Jain architecture.',
            details: `Standing 76 feet high with a base diameter of 32 feet and a top diameter of 15 feet, it features 69 steps across seven stories. It was built by Jija, son of Bagherwal Jain Shresthi Nay, and his son Punyasingh.

Maharana Kumbha's Vijay Stambh is considered a replica of this tower. It was renovated in the 12th century by King Kumarapala and in the 15th century by Shresthi Val. The tower proclaims the victory of eternal Jain culture.`
        }
    ];

    const historyIntroText = lang === 'hi'
        ? 'इतिहास में चित्तौड़गढ़ का नाम आते ही महाराणा प्रताप, सांगा और कुंभा जैसे वीरों; मीरा बाई जैसी भक्त शिरोमणि; भामाशाह जैसे दानवीर; कर्माशाह जैसे धर्मवीर; और आचार्य हरिभद्र जैसे महान विद्वानों की गौरवशाली छवियाँ उभरती हैं। यह चित्रकूट की वह पवित्र धरा है जहाँ शक्ति और भक्ति के साथ जैन गौरव का वैभव सदियों से सुरक्षित है।'
        : 'In history, the name Chittorgarh evokes glorious images of heroes like Maharana Pratap, Sanga, and Kumbha; the supreme devotee Meera Bai; the great philanthropist Bhamashah; the righteous Karmashah; and great scholars like Acharya Haribhadra. This is the holy land of Chitrakoot, where the splendor of Jain pride is preserved alongside power and devotion for centuries.';


    return (
        <div id="history" className="bg-white min-h-screen scroll-mt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-jain-orange/10 via-amber-50 to-white py-16 md:py-20 text-justify">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-stone-gray mb-6">
                            {pageTitle}
                        </h1>
                        <div className="w-24 h-1.5 bg-jain-orange mx-auto mb-8" />
                        <p className="text-lg md:text-xl text-stone-600 leading-relaxed italic border-l-4 border-jain-orange/30 pl-6 py-2 bg-white/50 rounded-r-lg">
                            {historyIntroText}
                        </p>
                        <p className="mt-6 text-stone-500">
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
                            {lang === 'hi' ? 'सात बीस देवरी परिसर' : 'Saat Bees Deori Complex'}
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
