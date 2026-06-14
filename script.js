document.addEventListener("DOMContentLoaded", () => {
    // ─── DOM References ───────────────────────────────────────────────────────
    const titleContainer = document.querySelector('.content-header h2');
    const leadText       = document.querySelector('.lead-text');
    const searchInput    = document.getElementById('community-search');
    const searchBtn      = document.getElementById('search-btn');
    const langSwitcher   = document.getElementById('lang-switcher');
    const exitModal      = document.getElementById('exit-modal');
    
    // Create toast container dynamically if not exists
    let toastEl = document.getElementById('toast-notification');
    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'toast-notification';
        document.body.appendChild(toastEl);
    }

    // ─── Phase 8: Curated Master Database ─────────────────────────────────────
    const db = {
        agri: {
            en: {
                wikiSlug: "Agri_(caste)",
                title: "The Living History",
                prefix: "Agri Samaj:",
                summary: "The Agri or Aagri are a mostly Hindu caste found in Mumbai, Thane District, Raigad District & Palghar district of Konkan division, Maharashtra, India. They are mainly involved in fishing, salt making, and rice farming.",
                history: `
                    <p><span class="drop-cap">T</span>he term Agri originates from the Marathi word "Agar", which denotes a salt pan. Long before Mumbai and Thane became concrete metropolises, the Agri people were the indigenous inhabitants of this coastal wetland. They mastered the complex environmental science of solar evaporation to manufacture salt from the Arabian Sea.</p>
                    <blockquote>According to ancient community lore, the Agri trace their lineage to the great Sage Agastya, whose son Agla was commanded to draw his livelihood by extracting salt from the ocean waves.</blockquote>
                    <p>While historically recognized as the original salt-makers (Mithagaris), the community simultaneously mastered coastal rice farming and fishing, adapting to the harsh saline wetlands of the Konkan coast. During the British colonial era, they were central to local resistance, actively participating in the 1930 Chirner Jungle Satyagraha to protest oppressive land and forest laws.</p>`,
                culture: "<p>Deeply spiritual, the Agri community is devoted to Lord Khandoba and Ekvira Devi. Their festivals, particularly Shimga (Holi) and Narali Poornima (Coconut Festival), are celebrated with massive fervor, traditional dance, and community gatherings.</p>",
                cuisine: "<p>The Agri culinary tradition is defined by the bold, fiery 'Agri Masala'. Their diet relies heavily on fresh coastal seafood, bhakri (rice bread), and uniquely spiced dry fish preparations.</p>",
                language: "<p>The community speaks the 'Agri dialect' of Maharashtri Konkani. It is written in the Devanagari script and features a unique coastal vocabulary that distinguishes it from standard Marathi.</p>",
                timeline: [
                    { title: "The Indigenous Era", desc: "Ancient roots in the coastal regions, establishing a legacy of salt making, agriculture, and fishing along the Arabian Sea." },
                    { title: "The Chirner Andolan", desc: "Participation in the 1930 anti-colonial Forest Satyagraha, marking a significant contribution to India's independence movement." },
                    { title: "The Urbanization Shift", desc: "Adapting to the rapid late 20th century transition and urbanization of Mumbai and Navi Mumbai while striving to retain cultural identity." },
                    { title: "The Modern Reality", desc: "Current initiatives focused on cultural preservation, documenting oral histories, and keeping the Agri Masala and traditional festivals alive." }
                ],
                infobox: `
                    <aside class="wiki-infobox">
                        <h4 class="infobox-title">Agri Samaj</h4>
                        <table style="width:100%;text-align:left;font-size:0.9rem;">
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Population:</th><td>~416,000 (1931)</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Regions:</th><td>Mumbai, Thane, Raigad</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Religion:</th><td>Hinduism</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Verified Sources:</th>
                            <td>
                                <a href="https://en.wikipedia.org/wiki/Agri_(caste)" target="_blank" rel="noopener noreferrer" style="color:var(--color-earth-green);">Wikipedia Archive</a><br>
                                <a href="#" style="color:var(--color-earth-green);">Maharashtra Gazette</a>
                            </td></tr>
                        </table>
                    </aside>`
            },
            hi: {
                title: "जीवंत इतिहास",
                prefix: "आगरी समाज:",
                summary: "आगरी मुख्य रूप से एक हिंदू जाति है जो महाराष्ट्र के कोंकण क्षेत्र, मुंबई, ठाणे और रायगढ़ में पाई जाती है। वे मुख्य रूप से मछली पकड़ने, नमक बनाने और चावल की खेती में शामिल हैं।",
                history: `
                    <p><span class="drop-cap">आ</span>गरी शब्द की उत्पत्ति मराठी शब्द 'आगर' से हुई है, जिसका अर्थ है नमक का मैदान। मुंबई और ठाणे के महानगर बनने से बहुत पहले, आगरी लोग इस तटीय आर्द्रभूमि के मूल निवासी थे।</p>
                    <blockquote>प्राचीन सामुदायिक विद्या के अनुसार, आगरी अपनी वंशावली महान ऋषि अगस्त्य से मानते हैं।</blockquote>
                    <p>ब्रिटिश काल के दौरान, वे स्थानीय प्रतिरोध के केंद्र में थे, और 1930 के चिरनेर जंगल सत्याग्रह में सक्रिय रूप से भाग लिया।</p>`,
                culture: "<p>आगरी समुदाय भगवान खंडोबा और एकवीरा देवी के प्रति गहरी आस्था रखता है। उनके त्योहार, विशेष रूप से होली और नारली पूर्णिमा, बड़े उत्साह के साथ मनाए जाते हैं।</p>",
                cuisine: "<p>आगरी पाक परंपरा 'आगरी मसाला' द्वारा परिभाषित है। उनका आहार तटीय समुद्री भोजन और मसालेदार सूखी मछली पर निर्भर करता है।</p>",
                language: "<p>यह समुदाय 'आगरी बोली' बोलता है जिसे देवनागरी लिपि में लिखा जाता है।</p>",
                timeline: [
                    { title: "स्वदेशी युग", desc: "तटीय क्षेत्रों में प्राचीन जड़ें।" },
                    { title: "चिरनेर आंदोलन", desc: "1930 के वन सत्याग्रह में भागीदारी।" },
                    { title: "शहरीकरण का दौर", desc: "मुंबई के शहरीकरण के अनुकूल होना।" },
                    { title: "आधुनिक वास्तविकता", desc: "सांस्कृतिक संरक्षण पर वर्तमान पहल।" }
                ],
                infobox: `
                    <aside class="wiki-infobox">
                        <h4 class="infobox-title">आगरी समाज</h4>
                        <table style="width:100%;text-align:left;font-size:0.9rem;">
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">क्षेत्र:</th><td>मुंबई, ठाणे, रायगढ़</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">धर्म:</th><td>हिन्दू धर्म</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">स्रोत:</th>
                            <td><a href="https://hi.wikipedia.org/wiki/%E0%A0%86%E0%A0%97%E0%A0%B0%E0%A0%BF_(%E0%A0%9C%E0%A0%BE%E0%A0%A4%E0%A0%BF)" target="_blank" rel="noopener noreferrer" style="color:var(--color-earth-green);">विकिपीडिया</a></td></tr>
                        </table>
                    </aside>`
            },
            mr: {
                title: "जिवंत इतिहास",
                prefix: "आगरी समाज:",
                summary: "आगरी ही प्रामुख्याने महाराष्ट्रातील कोकण विभागात, मुंबई, ठाणे आणि रायगड जिल्ह्यात आढळणारी हिंदू जात आहे. ते मुख्यत्वे मासेमारी, मीठ तयार करणे आणि भातशेती करतात.",
                history: `
                    <p><span class="drop-cap">आ</span>गरी हा शब्द 'आगर' या शब्दावरून आला आहे, ज्याचा अर्थ मिठागर असा होतो. मुंबई आणि ठाणे महानगरे बनण्यापूर्वी, आगरी लोक या किनारपट्टीचे मूळ रहिवासी होते.</p>
                    <blockquote>प्राचीन परंपरेनुसार, आगरी लोक त्यांचा वंश महान ऋषी अगस्त्य यांच्याशी जोडतात.</blockquote>
                    <p>ब्रिटिश काळात, त्यांनी स्थानिक प्रतिकारात महत्त्वाची भूमिका बजावली, विशेषतः १९३० च्या चिरनेर जंगल सत्याग्रहात.</p>`,
                culture: "<p>आगरी समाज भगवान खंडोबा आणि एकवीरा देवीचे निस्सीम भक्त आहेत. शिमगा (होळी) आणि नारळी पौर्णिमा हे त्यांचे प्रमुख सण आहेत.</p>",
                cuisine: "<p>आगरी पाककला तिच्या तिखट 'आगरी मसाला'साठी ओळखली जाते. त्यांचा आहार प्रामुख्याने ताजे मासे आणि भाकरीवर आधारित आहे.</p>",
                language: "<p>हा समाज 'आगरी बोली' बोलतो. ती देवनागरी लिपीत लिहिली जाते आणि तिला एक विशिष्ट किनारपट्टीचा लहेजा आहे.</p>",
                timeline: [
                    { title: "स्वदेशी काळ", desc: "किनारपट्टीवरील प्राचीन वसाहत आणि मिठागरांचा वारसा." },
                    { title: "चिरनेर आंदोलन", desc: "१९३० च्या ब्रिटिशविरोधी जंगल सत्याग्रहातील सहभाग." },
                    { title: "शहरीकरणाचे आव्हान", desc: "मुंबईच्या वेगाने वाढणाऱ्या शहरीकरणाशी जुळवून घेणे." },
                    { title: "आधुनिक वास्तव", desc: "सांस्कृतिक संवर्धन आणि पारंपरिक सणांचे जतन." }
                ],
                infobox: `
                    <aside class="wiki-infobox">
                        <h4 class="infobox-title">आगरी समाज</h4>
                        <table style="width:100%;text-align:left;font-size:0.9rem;">
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">प्रदेश:</th><td>मुंबई, ठाणे, रायगड, पालघर</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">धर्म:</th><td>हिंदू धर्म</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">स्त्रोत:</th>
                            <td><a href="https://mr.wikipedia.org/wiki/%E0%A4%86%E0%A4%97%E0%A4%B0%E0%A5%80" target="_blank" rel="noopener noreferrer" style="color:var(--color-earth-green);">विकिपीडिया</a></td></tr>
                        </table>
                    </aside>`
            }
        },
        koli: {
            en: {
                wikiSlug: "Koli_people",
                title: "The Living History",
                prefix: "Koli Community:",
                summary: "The Koli people are historically recognized as the original fishermen and indigenous inhabitants of the Mumbai archipelago and the broader Konkan coast. They boast a proud naval history.",
                history: `
                    <p><span class="drop-cap">B</span>efore the seven islands were merged into the megacity of Mumbai, they were home to the Kolis. Renowned for their unparalleled maritime navigation skills, the Kolis were the undisputed masters of the western Indian coastline.</p>
                    <blockquote>Under the leadership of Kanhoji Angre, the Koli naval fleet successfully defended the Maratha Empire's coastline against the British, Portuguese, and Dutch navies.</blockquote>
                    <p>Today, Koliwadas (fishermen's villages) still stand as cultural fortresses within the modern landscape of Mumbai, preserving centuries-old coastal traditions.</p>`,
                culture: "<p>Their most significant festival is Narali Poornima (The Coconut Festival). It marks the end of the monsoon season, where golden coconuts are offered to the sea god Varuna.</p>",
                cuisine: "<p>Koli cuisine is an absolute celebration of the sea. Famous dishes include Bombil (Bombay Duck) fry, Surmai fish curry, and Kolambi (prawn) preparations, all flavored with their unique Koli Masala.</p>",
                language: "<p>The community speaks Koli dialects of Marathi, heavily influenced by their maritime environment and historical coastal trade.</p>",
                timeline: [
                    { title: "The Seven Islands", desc: "Original settlement on the Mumbai archipelago before land reclamation." },
                    { title: "The Naval Golden Age", desc: "Serving as formidable naval commanders in the Maratha fleet under Shivaji Maharaj and Kanhoji Angre." },
                    { title: "The Koliwadas", desc: "Establishment of historic fishing villages that survived the industrialization of Mumbai." },
                    { title: "Modern Struggles", desc: "Fighting to preserve their coastal livelihoods amidst modern real estate development." }
                ],
                infobox: `
                    <aside class="wiki-infobox">
                        <h4 class="infobox-title">Koli Community</h4>
                        <table style="width:100%;text-align:left;font-size:0.9rem;">
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Primary Occupation:</th><td>Fishing, Naval Trade</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Regions:</th><td>Maharashtra, Gujarat, Goa</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Verified Sources:</th>
                            <td><a href="https://en.wikipedia.org/wiki/Koli_people" target="_blank" rel="noopener noreferrer" style="color:var(--color-earth-green);">Wikipedia Archive</a></td></tr>
                        </table>
                    </aside>`
            },
            hi: {
                title: "जीवंत इतिहास",
                prefix: "कोली समुदाय:",
                summary: "कोली लोग ऐतिहासिक रूप से मुंबई द्वीपसमूह और व्यापक कोंकण तट के मूल मछुआरों के रूप में जाने जाते हैं।",
                history: `<p><span class="drop-cap">मुं</span>बई के सात द्वीपों के महानगर बनने से पहले, वे कोलियों का घर थे। कान्होजी आंग्रे के नेतृत्व में कोली नौसेना बेड़े ने ब्रिटिश और पुर्तगाली नौसेनाओं के खिलाफ मराठा साम्राज्य की तटरेखा का सफलतापूर्वक बचाव किया।</p>`,
                culture: "<p>उनका सबसे महत्वपूर्ण त्योहार नारली पूर्णिमा है। यह मानसून के मौसम के अंत का प्रतीक है, जहां समुद्र देवता वरुण को नारियल चढ़ाए जाते हैं।</p>",
                cuisine: "<p>कोली भोजन समुद्र का उत्सव है। प्रसिद्ध व्यंजनों में बॉम्बिल (बॉम्बे डक) फ्राई और सुरमई फिश करी शामिल हैं।</p>",
                language: "<p>यह समुदाय मराठी की कोली बोलियाँ बोलता है।</p>",
                timeline: [
                    { title: "सात द्वीप", desc: "मुंबई द्वीपसमूह पर मूल बस्ती।" },
                    { title: "नौसेना का स्वर्ण युग", desc: "मराठा बेड़े में दुर्जेय नौसैनिक कमांडर।" },
                    { title: "कोलीवाडा", desc: "ऐतिहासिक मछली पकड़ने वाले गांवों की स्थापना।" },
                    { title: "आधुनिक संघर्ष", desc: "तटीय आजीविका को संरक्षित करने की लड़ाई।" }
                ],
                infobox: ""
            },
            mr: {
                title: "जिवंत इतिहास",
                prefix: "कोळी समाज:",
                summary: "कोळी लोक ऐतिहासिकदृष्ट्या मुंबई बेटांचे मूळ रहिवासी आणि मुख्य मासेमारी समाज म्हणून ओळखले जातात.",
                history: `<p><span class="drop-cap">मुं</span>बईची सात बेटे महानगर होण्यापूर्वी ती कोळ्यांची होती. कान्होजी आंग्रे यांच्या नेतृत्वाखाली कोळी नौदलाने ब्रिटिश आणि पोर्तुगीजांविरुद्ध मराठा साम्राज्याच्या किनारपट्टीचे यशस्वी रक्षण केले.</p>`,
                culture: "<p>त्यांचा सर्वात महत्त्वाचा सण म्हणजे नारळी पौर्णिमा. हा पावसाळ्याचा शेवट दर्शवतो, जिथे समुद्रदेवतेला नारळ अर्पण केले जातात.</p>",
                cuisine: "<p>कोळी जेवण म्हणजे समुद्राचा उत्सवच. प्रसिद्ध पदार्थांमध्ये बोंबील फ्राय आणि सुरमई करीचा समावेश आहे.</p>",
                language: "<p>हा समाज मराठीची कोळी बोली बोलतो.</p>",
                timeline: [
                    { title: "सात बेटे", desc: "मुंबईच्या बेटांवर मूळ वसाहत." },
                    { title: "नौदलाचे सुवर्ण युग", desc: "मराठा आरमारात उत्कृष्ट नौदल कमांडर." },
                    { title: "कोळीवाडे", desc: "ऐतिहासिक मासेमारी गावांची स्थापना." },
                    { title: "आधुनिक संघर्ष", desc: "किनारपट्टीवरील उपजीविका टिकवण्याचा लढा." }
                ],
                infobox: ""
            }
        },
        warli: {
            en: {
                wikiSlug: "Warli",
                title: "The Living History",
                prefix: "Warli Tribe:",
                summary: "The Warli or Varli are an indigenous tribe (Adivasi) of western India, living in mountainous as well as coastal areas of Maharashtra and Gujarat. They are globally renowned for their unique art.",
                history: `
                    <p><span class="drop-cap">I</span>solated in the foothills of the Sahyadri mountains, the Warli tribe has maintained a deep, symbiotic relationship with the forest for millennia. They are historically agriculturalists and foragers.</p>
                    <blockquote>In 1945, the Warli people united in a historic uprising known as the Warli Revolt, protesting against the oppressive bonded labor practices of landlords.</blockquote>
                    <p>Today, they are globally recognized not for their history of struggle, but for their incredible artistic heritage, which beautifully maps human interaction with nature.</p>`,
                culture: "<p>Warli culture is deeply animistic. They worship nature, specifically the Tiger God (Waghoba), and celebrate the harvest festival. Their world-famous Warli Painting—created using rice paste on red ochre mud walls—is traditionally done by women.</p>",
                cuisine: "<p>Their diet is completely sustainable and forest-foraged, heavily relying on millet (nachni), wild vegetables, river fish, and locally hunted game.</p>",
                language: "<p>The tribe speaks Varli, which belongs to the Indo-Aryan language family, serving as a linguistic bridge between Marathi and Gujarati.</p>",
                timeline: [
                    { title: "Ancient Animism", desc: "Millennia of sustainable living in the Sahyadri mountains." },
                    { title: "The Warli Revolt", desc: "The historic 1945 uprising against bonded labor led by Godavari Parulekar." },
                    { title: "Artistic Awakening", desc: "In the 1970s, Warli art moved from mud walls to canvas, gaining global recognition." },
                    { title: "Cultural Preservation", desc: "Modern efforts to patent and protect genuine Warli art from commercial exploitation." }
                ],
                infobox: `
                    <aside class="wiki-infobox">
                        <h4 class="infobox-title">Warli Tribe</h4>
                        <table style="width:100%;text-align:left;font-size:0.9rem;">
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Classification:</th><td>Scheduled Tribe (Adivasi)</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Regions:</th><td>Palghar, Dahanu, Gujarat border</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Known For:</th><td>Warli Painting</td></tr>
                            <tr><th style="padding-right:10px;color:var(--color-terracotta-text);">Verified Sources:</th>
                            <td><a href="https://en.wikipedia.org/wiki/Warli" target="_blank" rel="noopener noreferrer" style="color:var(--color-earth-green);">Wikipedia Archive</a><br><a href="#" style="color:var(--color-earth-green);">Tribal Ministry India</a></td></tr>
                        </table>
                    </aside>`
            },
            hi: {
                title: "जीवंत इतिहास",
                prefix: "वर्ली जनजाति:",
                summary: "वर्ली पश्चिमी भारत की एक स्वदेशी जनजाति (आदिवासी) है, जो महाराष्ट्र और गुजरात के पहाड़ी इलाकों में रहती है। वे अपनी अनूठी कला के लिए विश्व स्तर पर प्रसिद्ध हैं।",
                history: `<p><span class="drop-cap">स</span>ह्याद्रि पहाड़ों की तलहटी में अलग-थलग, वारली जनजाति ने सहस्राब्दियों से जंगल के साथ एक गहरा संबंध बनाए रखा है। 1945 में, वर्ली लोगों ने जमींदारों की दमनकारी बंधुआ मजदूरी प्रथाओं का विरोध करते हुए एक ऐतिहासिक विद्रोह किया।</p>`,
                culture: "<p>वर्ली संस्कृति प्रकृति की पूजा करती है, विशेष रूप से बाघ भगवान (वाघोबा) की। उनकी विश्व प्रसिद्ध वर्ली पेंटिंग पारंपरिक रूप से महिलाओं द्वारा लाल मिट्टी की दीवारों पर चावल के पेस्ट का उपयोग करके बनाई जाती है।</p>",
                cuisine: "<p>उनका आहार पूरी तरह से टिकाऊ है, जो बाजरा, जंगली सब्जियों और नदी की मछलियों पर निर्भर करता है।</p>",
                language: "<p>वे वर्ली बोलते हैं, जो मराठी और गुजराती के बीच एक भाषाई पुल के रूप में कार्य करती है।</p>",
                timeline: [
                    { title: "प्राचीन प्रकृतिवाद", desc: "सह्याद्री में सहस्राब्दियों का जीवन।" },
                    { title: "वर्ली विद्रोह", desc: "1945 का ऐतिहासिक बंधुआ मजदूरी विरोधी विद्रोह।" },
                    { title: "कलात्मक जागरण", desc: "1970 के दशक में, वर्ली कला को वैश्विक मान्यता मिली।" },
                    { title: "सांस्कृतिक संरक्षण", desc: "वर्ली कला को व्यावसायिक शोषण से बचाने का प्रयास।" }
                ],
                infobox: ""
            },
            mr: {
                title: "जिवंत इतिहास",
                prefix: "वारली समाज:",
                summary: "वारली ही महाराष्ट्र आणि गुजरातमधील एक आदिवासी जमात आहे. ते त्यांच्या अद्वितीय वारली चित्रकलेसाठी जगभर प्रसिद्ध आहेत.",
                history: `<p><span class="drop-cap">स</span>ह्याद्रीच्या कुशीत वसलेल्या वारली समाजाने हजारो वर्षांपासून जंगलाशी जवळचे नाते टिकवून ठेवले आहे. १९४५ मध्ये, वारली लोकांनी जमीनदारांच्या वेठबिगारी विरुद्ध ऐतिहासिक उठाव केला.</p>`,
                culture: "<p>वारली संस्कृती निसर्गपूजक आहे, विशेषतः वाघोबाची पूजा केली जाते. त्यांची जगप्रसिद्ध वारली चित्रकला पारंपारिकपणे महिलांद्वारे तांदळाच्या पिठाने लाल मातीच्या भिंतींवर काढली जाते.</p>",
                cuisine: "<p>त्यांचा आहार पूर्णपणे शाश्वत आणि जंगलावर आधारित आहे, ज्यामध्ये नाचणी, रानभाज्या आणि नदीतील मासे यांचा समावेश आहे.</p>",
                language: "<p>हा समाज वारली बोली बोलतो, जी मराठी आणि गुजराती मधील एक दुवा आहे.</p>",
                timeline: [
                    { title: "प्राचीन निसर्गवाद", desc: "सह्याद्री पर्वतातील हजारो वर्षांचे शाश्वत जीवन." },
                    { title: "वारली उठाव", desc: "१९४५ चा वेठबिगारी विरुद्धचा ऐतिहासिक उठाव." },
                    { title: "कलेचा उदय", desc: "१९७० च्या दशकात वारली चित्रकलेला जागतिक ओळख." },
                    { title: "सांस्कृतिक संवर्धन", desc: "मूळ वारली कलेचे व्यावसायिक शोषणापासून संरक्षण." }
                ],
                infobox: ""
            }
        }
    };

    // ─── State ────────────────────────────────────────────────────────────────
    let currentCommunity = 'agri';
    let currentLang    = 'en';

    // ─── Utilities ────────────────────────────────────────────────────────────
    function showToast(msg, type = 'error') {
        toastEl.textContent = msg;
        toastEl.className = `toast-notification toast-${type} show`;
        setTimeout(() => toastEl.classList.remove('show'), 4000);
    }

    // ─── 1. Core Rendering Engine ─────────────────────────────────────────────
    function loadCommunityData(communityKey, langKey) {
        if (!db[communityKey]) {
            showToast('Community not found in curated database. Please try Agri, Koli, or Warli.');
            return;
        }

        const data = db[communityKey][langKey] || db[communityKey]['en'];
        const enData = db[communityKey]['en']; // for wikiSlug

        // Dynamic Image Mechanism (Fetch copyright-free image from Wikipedia)
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            // Setup robust fallback mechanism in case image is blocked or broken
            heroImage.onerror = function() {
                this.onerror = null; // prevent infinite loop if fallback fails
                this.src = 'hero-illustration.png';
                this.style.width = 'auto';
                this.style.objectFit = 'contain';
                this.style.boxShadow = 'none';
                this.style.borderRadius = '0';
            };

            if (enData.wikiSlug) {
                fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(enData.wikiSlug)}`)
                    .then(res => res.json())
                    .then(wiki => {
                        if (wiki.originalimage && wiki.originalimage.source) {
                            heroImage.style.width = 'auto';
                            heroImage.style.maxWidth = '100%';
                            heroImage.style.objectFit = 'contain';
                            heroImage.style.borderRadius = '12px';
                            heroImage.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                            heroImage.src = wiki.originalimage.source;
                        } else if (wiki.thumbnail && wiki.thumbnail.source) {
                            heroImage.style.width = 'auto';
                            heroImage.style.maxWidth = '100%';
                            heroImage.style.objectFit = 'contain';
                            heroImage.style.borderRadius = '12px';
                            heroImage.src = wiki.thumbnail.source;
                        } else {
                            // Fallback if API has no image
                            heroImage.src = 'hero-illustration.png';
                            heroImage.style.width = 'auto';
                            heroImage.style.objectFit = 'contain';
                            heroImage.style.boxShadow = 'none';
                            heroImage.style.borderRadius = '0';
                        }
                    }).catch(err => {
                        console.warn('Failed to fetch Wikipedia image:', err);
                        heroImage.src = 'hero-illustration.png';
                        heroImage.style.width = 'auto';
                        heroImage.style.objectFit = 'contain';
                        heroImage.style.boxShadow = 'none';
                        heroImage.style.borderRadius = '0';
                    });
            } else {
                heroImage.src = 'hero-illustration.png';
                heroImage.style.width = 'auto';
                heroImage.style.objectFit = 'contain';
                heroImage.style.boxShadow = 'none';
                heroImage.style.borderRadius = '0';
            }
        }

        // Header Updates
        if (titleContainer) titleContainer.textContent = data.title;
        
        // Update Subtitle dynamically
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            const communityName = data.prefix ? data.prefix.replace(':', '').trim() : 'Indian Culture';
            subtitle.textContent = `The ${communityName} Heritage Archive`;
        }

        if (leadText) {
            leadText.innerHTML = `<strong>${data.prefix}</strong> ${data.summary}`;
            const sourceLink = document.createElement('small');
            sourceLink.innerHTML = `<br><br>— Curated Source: <a href="#" style="color:var(--color-saffron);text-decoration:none;">Virasat Archive Internal DB</a>`;
            leadText.appendChild(sourceLink);
        }

        // Deep Dive Content Injection
        document.getElementById('panel-history').innerHTML = (data.infobox || '') + data.history;
        document.getElementById('panel-culture').innerHTML = data.culture;
        document.getElementById('panel-cuisine').innerHTML = data.cuisine;
        document.getElementById('panel-language').innerHTML = data.language;

        // Timeline Update
        for (let i = 1; i <= 4; i++) {
            const container = document.getElementById(`checkpoint-${i}`);
            if (!container) continue;
            const titleEl = container.querySelector('.checkpoint-title');
            const descEl  = container.querySelector('.checkpoint-desc');
            
            if (data.timeline && data.timeline[i - 1]) {
                if (titleEl) titleEl.textContent = data.timeline[i - 1].title;
                if (descEl)  descEl.textContent  = data.timeline[i - 1].desc;
                container.closest('.timeline-item').style.display = 'block';
            } else {
                container.closest('.timeline-item').style.display = 'none';
            }
        }

        // Trigger Animations
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('reveal-visible'));
    }

    // ─── 2. Internal Search Engine ────────────────────────────────────────────
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;
        executeLocalSearch(query);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim().toLowerCase();
            if (query) executeLocalSearch(query);
        }
    });

    function executeLocalSearch(query) {
        document.querySelectorAll('.index-list a').forEach(l => l.classList.remove('active'));
        
        // Simple internal matching
        if (query.includes('agri')) currentCommunity = 'agri';
        else if (query.includes('koli')) currentCommunity = 'koli';
        else if (query.includes('warli')) currentCommunity = 'warli';
        else {
            showToast('Community not curated yet. Search for Agri, Koli, or Warli.');
            return;
        }
        
        // Update active class in sidebar
        const targetLink = document.querySelector(`.index-list a[data-community="${currentCommunity}"]`);
        if(targetLink) targetLink.classList.add('active');

        loadCommunityData(currentCommunity, currentLang);
    }

    // ─── 3. Sidebar Navigation ────────────────────────────────────────────────
    document.querySelectorAll('.index-list a[data-community]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.index-list a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            currentCommunity = link.getAttribute('data-community');
            searchInput.value = '';
            
            // Keep current language if possible, else defaults in loadCommunityData
            loadCommunityData(currentCommunity, currentLang);
        });
    });

    // ─── 4. Multilingual Switcher ─────────────────────────────────────────────
    langSwitcher.addEventListener('change', (e) => {
        currentLang = e.target.value;
        loadCommunityData(currentCommunity, currentLang);
    });

    // ─── 5. Tab Switching ─────────────────────────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active-panel'));
            btn.classList.add('active');
            const targetPanel = document.getElementById(btn.getAttribute('data-target'));
            if (targetPanel) targetPanel.classList.add('active-panel');
        });
    });

    // ─── 6. Cinematic Intersection Observer ──────────────────────────────────
    if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));
    } else {
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('reveal-visible'));
    }

    // ─── 7. Exit Intent Modal & Form ─────────────────────────────────────────
    document.addEventListener("mouseleave", (e) => {
        if (e.clientY < 0 && !sessionStorage.getItem('hasSeenExitModal')) {
            exitModal.style.display = 'flex';
            exitModal.setAttribute('aria-hidden', 'false');
            sessionStorage.setItem('hasSeenExitModal', 'true');
        }
    });

    document.getElementById('close-modal-btn').addEventListener('click', () => {
        exitModal.style.display = 'none';
        exitModal.setAttribute('aria-hidden', 'true');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && exitModal.style.display === 'flex') {
            exitModal.style.display = 'none';
            exitModal.setAttribute('aria-hidden', 'true');
        }
    });

    const contributionForm = document.getElementById('contribution-form');
    const successMsg        = document.getElementById('form-success-msg');
    if (contributionForm) {
        contributionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name   = document.getElementById('contributor-name').value.trim();
            const legend = document.getElementById('community-info').value.trim();
            const story  = document.getElementById('deep-story').value.trim();

            if (!name || !legend || !story) {
                showToast('Please fill in all fields before saving.', 'error');
                return;
            }

            try {
                const existingContributions = JSON.parse(localStorage.getItem('userContributions') || '[]');
                existingContributions.push({
                    id: Date.now(), name, legend, story,
                    community: currentCommunity,
                    date: new Date().toISOString()
                });
                localStorage.setItem('userContributions', JSON.stringify(existingContributions));
            } catch (err) {
                console.warn('localStorage not available:', err);
            }

            contributionForm.querySelectorAll('.form-group, .submit-btn').forEach(el => el.style.display = 'none');
            if (successMsg) successMsg.style.display = 'block';

            setTimeout(() => {
                exitModal.style.display = 'none';
                exitModal.setAttribute('aria-hidden', 'true');
                contributionForm.reset();
                contributionForm.querySelectorAll('.form-group, .submit-btn').forEach(el => el.style.display = 'block');
                if (successMsg) successMsg.style.display = 'none';
            }, 2500);
        });
    }

    // ─── Init ─────────────────────────────────────────────────────────────────
    // Fix initial language switcher options (hardcode the 3 we support)
    langSwitcher.innerHTML = `
        <option value="en" selected>English</option>
        <option value="hi">Hindi (हिन्दी)</option>
        <option value="mr">Marathi (मराठी)</option>
    `;
    loadCommunityData(currentCommunity, currentLang);
    console.log('%c✅ Virasat Archive v8.0 — Curated Premium Database Active', 'color:#E55B13;font-weight:bold;font-size:14px;');
});
