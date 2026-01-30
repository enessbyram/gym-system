import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faUpload, faTimes, faImage } from "@fortawesome/free-solid-svg-icons";

const AdminSlider = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Slider verileri artık backend'den gelecek
  const [sliderImages, setSliderImages] = useState([]);

  // --- API İŞLEMLERİ ---

  // 1. Verileri Çek (READ)
  const fetchSliders = async () => {
    try {
      const response = await fetch("http://localhost/gym-system/api/sliders.php");
      const data = await response.json();
      setSliderImages(data);
    } catch (error) {
      console.error("Slider verisi çekilemedi:", error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // --- HANDLERS ---

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 2. Yeni Görsel Ekle (CREATE)
  const handleAddImage = async () => {
    if (!selectedFile) {
      alert("Lütfen bir görsel seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost/gym-system/api/sliders.php", {
        method: "POST",
        body: formData, // Header ekleme, FormData otomatik halleder
      });
      
      const result = await response.json();

      if (result.success) {
        await fetchSliders(); // Listeyi yenile
        closeModal();
      } else {
        alert("Hata: " + result.error);
      }
    } catch (error) {
      console.error("Yükleme hatası:", error);
    }
  };

  // 3. Silme İşlemi (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Bu slider görselini silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`http://localhost/gym-system/api/sliders.php?id=${id}`, {
          method: "DELETE"
        });
        const result = await response.json();

        if (result.success) {
          setSliderImages(sliderImages.filter((img) => img.id !== id));
        } else {
          alert("Hata: " + result.error);
        }
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="w-full relative animate-fade-in">
      
      {/* Üst Kısım: Yeni Ekle Butonu */}
      <div className="mb-8">
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#22c55e] cursor-pointer hover:bg-[#1ea84f] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Yeni Görsel Ekle
        </button>
      </div>

      {/* Görsel Listesi (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sliderImages.length > 0 ? (
          sliderImages.map((item) => (
            <div key={item.id} className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl p-4 shadow-xl hover:border-[#444] transition-all group">
              
              {/* Görsel Alanı */}
              <div className="w-full h-48 rounded-xl overflow-hidden mb-4 relative bg-[#252525]">
                <img 
                  src={item.image} 
                  alt={item.alt || "Slider"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>

              {/* Sil Butonu */}
              <button 
                onClick={() => handleDelete(item.id)}
                className="w-full bg-[#3a1a1a] border border-red-900/30 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faTrash} />
                Sil
              </button>
            </div>
          ))
        ) : (
          <p className="text-[#555] col-span-3 text-center py-10">Henüz slider görseli eklenmemiş.</p>
        )}
      </div>

      {/* --- MODAL (Yeni Görsel Ekleme) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-[#252525] p-5 border-b border-[#383737] flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Yeni Slider Görseli</h3>
              <button onClick={closeModal} className="text-[#5b5b5b] hover:text-white transition-colors cursor-pointer">
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-[#888] text-sm">Slider Görseli Seç</label>
                
                {/* Özel Dosya Input Yapısı */}
                <div className="relative w-full">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="bg-[#2e2e2e] border border-[#3e3e3e] rounded-xl p-2 flex items-center gap-4">
                        <span className="bg-[#22c55e] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md">
                           <FontAwesomeIcon icon={faUpload} className="mr-2" />
                           Dosya Seç
                        </span>
                        <span className="text-[#888] text-sm truncate">
                            {selectedFile ? selectedFile.name : "Dosya seçilmedi"}
                        </span>
                    </div>
                </div>
              </div>

              {/* Önizleme Alanı (Varsa) */}
              {previewUrl && (
                <div className="w-full h-40 rounded-xl overflow-hidden border border-[#3e3e3e] relative">
                    <img src={previewUrl} alt="Önizleme" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold tracking-wide">
                        Önizleme
                    </div>
                </div>
              )}

              {/* Aksiyon Butonları */}
              <div className="flex gap-3 mt-2">
                <button 
                  onClick={handleAddImage}
                  className="flex-1 bg-[#22c55e] cursor-pointer hover:bg-[#1ea84f] text-white py-3 rounded-xl font-bold transition-all"
                >
                  Ekle
                </button>
                <button
                  onClick={closeModal}
                  className="w-24 bg-[#333] cursor-pointer text-[#bbb] hover:bg-[#444] hover:text-white py-3 rounded-xl font-bold transition-all"
                >
                  İptal
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminSlider;