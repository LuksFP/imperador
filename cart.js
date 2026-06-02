const Cart = {
  KEY: 'imperador_cart',
  get() { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); },
  save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); },
  add(id) {
    const items = this.get();
    const ex = items.find(i => i.id === id);
    if (ex) ex.qty++; else items.push({ id, qty: 1 });
    this.save(items);
    this.refreshBadges();
  },
  setQty(id, qty) {
    const items = this.get();
    const ex = items.find(i => i.id === id);
    if (!ex) return;
    if (qty < 1) { this.remove(id); return; }
    ex.qty = qty;
    this.save(items);
    this.refreshBadges();
  },
  remove(id) {
    this.save(this.get().filter(i => i.id !== id));
    this.refreshBadges();
  },
  total() { return this.get().reduce((s, i) => s + i.qty, 0); },
  refreshBadges() {
    const n = this.total();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = n;
      el.classList.toggle('hidden', n === 0);
    });
  }
};
document.addEventListener('DOMContentLoaded', () => Cart.refreshBadges());
