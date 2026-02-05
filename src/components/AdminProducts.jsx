import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSave, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    stock: "",
    description: "",
    image: null
  });

  const API_BASE_URL = "/uploads/";

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.includes("localhost") || img.includes("api/uploads")) {
        const fileName = img.split('/').pop();
        return `${API_BASE_URL}${fileName}`;
    }
    if (img.startsWith("http")) return img; 
    return `${API_BASE_URL}${img}`;
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products.php");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ id: null, name: "", price: "", stock: "", description: "", image: null });
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setFormData(product);
    setSelectedFile(null);
    setPreviewUrl(getImageUrl(product.image)); 
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("price", formData.price);
    dataToSend.append("stock", formData.stock);
    dataToSend.append("description", formData.description);

    if (formData.id) {
      dataToSend.append("id", formData.id);
    }

    if (selectedFile) {
      dataToSend.append("image", selectedFile);
    }

    try {
      const response = await fetch("/api/products.php", {
        method: "POST",
        body: dataToSend, 
      });

      const result = await response.json();

      if (result.success || result.id) { 
        await fetchProducts(); 
        setShowModal(false);
      } else {
        alert("İşlem başarısız: " + (result.error || "Bilinmeyen hata"));
      }
    } catch (error) {
      console.error("Kaydetme hatası:", error);
      alert("Sunucu hatası oluştu.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`/api/products.php?id=${id}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.success) {
          setProducts(products.filter((p) => p.id !== id));
        } else {
          alert("Silme başarısız: " + result.error);
        }
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  };

  return (
    <div className="w-full relative animate-fade-in">
      
      <div className="mb-8">
        <button 
          onClick={openAddModal}
          className="bg-[#7c3aed] cursor-pointer hover:bg-[#7c3aed] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Yeni Ürün Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl overflow-hidden hover:border-[#444] transition-all group shadow-xl flex flex-col justify-between">
            
            <div className="h-48 w-full overflow-hidden relative bg-[#252525]">
              {product.image ? (
                <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#555]">Görsel Yok</div>
              )}
              
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${Number(product.stock) > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {Number(product.stock) > 0 ? `Stok: ${product.stock}` : 'Stok Yok'}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-white font-bold text-lg truncate" title={product.name}>{product.name}</h3>
              <p className="text-[#7c3aed] font-bold text-2xl">{Number(product.price).toLocaleString('tr-TR')}₺</p>
              
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => openEditModal(product)}
                  className="flex-1 bg-[#7c3aed] cursor-pointer hover:bg-[#7c3aed] text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faEdit} /> Düzenle
                </button>
                
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="w-12 bg-[#3a1a1a] cursor-pointer border border-red-900/30 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1e1e1e] border border-[#383737] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-[#252525] p-5 border-b border-[#383737] flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-white">
                {isEditing ? "Ürün Düzenle & Stok Güncelle" : "Yeni Ürün Ekle"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#5b5b5b] cursor-pointer hover:text-white transition-colors">
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar p-6">
                <form onSubmit={handleSave} className="flex flex-col gap-4">
                
                <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Ürün Adı</label>
                    <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="Örn: Whey Protein"
                    className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#7c3aed] outline-none transition-colors"
                    required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Fiyat (₺)</label>
                    <input 
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="1200"
                        className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#7c3aed] outline-none transition-colors"
                        required
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Stok Adedi</label>
                    <input 
                        type="number" 
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="100"
                        className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#7c3aed] outline-none transition-colors"
                        required
                    />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Ürün Fotoğrafı</label>
                    <div className="relative">
                        <input 
                            type="file" 
                            onChange={handleFileChange}
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        <div className="bg-[#252525] border border-[#3e3e3e] rounded-xl p-2 flex items-center gap-3">
                             <div className="bg-[#7c3aed] text-white py-2 px-4 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#7c3aed] transition-colors">
                                <FontAwesomeIcon icon={faUpload} /> Dosya Seç
                            </div>
                            <span className="text-[#5b5b5b] text-sm truncate max-w-50">
                                {selectedFile ? selectedFile.name : (isEditing ? "Görseli değiştirmek için seçin" : "Dosya seçilmedi")}
                            </span>
                        </div>
                    </div>
                    
                    {previewUrl && (
                        <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-[#333]">
                            <img src={previewUrl} alt="Önizleme" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#888] text-sm">Açıklama</label>
                    <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Ürün hakkında kısa bilgi..."
                    className="bg-[#2e2e2e] border border-[#3e3e3e] text-white rounded-xl p-3 focus:border-[#7c3aed] outline-none transition-colors resize-none"
                    ></textarea>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-[#383737]">
                    <button 
                    type="submit" 
                    className="flex-1 bg-[#22c55e] hover:bg-[#1ea84f] cursor-pointer text-white py-3 rounded-xl font-bold transition-all"
                    >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    {isEditing ? "Güncelle" : "Kaydet"}
                    </button>
                    <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-[#3a1a1a] border border-red-900/30 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition-all"
                    >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    İptal
                    </button>
                </div>

                </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;