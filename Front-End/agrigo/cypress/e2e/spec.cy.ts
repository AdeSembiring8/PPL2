describe('TS-01: User registrasi pada halaman registrasi', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    Cypress.config("baseUrl","http://localhost:3000/")
    cy.visit('/login');
    cy.contains('daftar sekarang!').click()
  });

  it('TC-01: User registrasi dengan data yang valid', () => {
    cy.get('input').eq(0).type("tes")
    cy.get('input').eq(1).type("123")
    cy.get('input').eq(2).type("123")
    cy.contains('register').click()
    cy.url().should('include', '/login')
  })

  it('TC-02: User registrasi dengan tidak mengisi data', () => {
    cy.get('button:contains("register")').should('be.disabled')
  })

  it('TC-03: User registrasi dengan tidak mengisi username', () => {
    cy.get('input').eq(1).type("123")
    cy.get('input').eq(2).type("123")
    cy.contains('register').click()
    cy.get('p:contains("Username Sudah Terdaftar!")').should('not.exist')
    cy.url().should('include','/register')
  })

  it('TC-04: User registrasi dengan tidak mengisi password', () => {
    cy.get('input').eq(0).type("tes")
    cy.get('input').eq(2).type("123")
    cy.get('button:contains("register")').should('be.disabled')
  })

  it('TC-05: User registrasi dengan tidak mengisi konfirmasi password', () => {
    cy.get('input').eq(0).type("tes")
    cy.get('input').eq(1).type("123")
    cy.contains('register').click()
    cy.get('p:contains("Password dan konfirmasi password tidak sesuai.")')
    cy.url().should('not.include','/login')
  })
})

describe('TS-02: User login pada halaman login', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    Cypress.config("baseUrl","http://localhost:3000/")
    cy.visit('/login');
  });

  it('TC-01: User login dengan mengisi data yang valid', () => {
    cy.get('input').eq(0).type("tes")
    cy.get('input').eq(1).type("123")
    cy.contains('Login').click()
    cy.url().should('include','/landingPage')
  })

  it('TC-02: User login dengan mengisi data yang tidak valid', () => {
    cy.get('input').eq(0).type("test")
    cy.get('input').eq(1).type("test")
    cy.contains('Login').click()
    cy.get('p:contains("Username atau Password Salah !")')
    cy.url().should('include','/login')
  })

  it('TC-03: User login dengan tidak mengisi data', () => {
    cy.contains('Login').click()
    cy.wait(1000)
    cy.url().should('include','/login')
  })

  it('TC-04: User login dengan tidak mengisi username', () => {
    cy.get('input').eq(1).type("test123")
    cy.contains('Login').click()
    cy.url().should('include','/login')
  })

  it('TC-05: User login dengan tidak mengisi password', () => {
    cy.get('input').eq(0).type("test123")
    cy.contains('Login').click()
    cy.url().should('include','/login')
  })
})

describe('TS-03: User mengkases halaman homepage dan membeli produk', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    Cypress.config("baseUrl","http://localhost:3000/")
    cy.visit('/landingPage')
  });

  it('TC-01: User membeli produk dengan memasukkan kuantitas pesanan', () => {
    cy.contains('Mulai Belanja').click()
    cy.wait(2000);
    cy.get('button').eq(0).click()
    cy.get('input').eq(0).type('2')
    cy.get('button:contains("Checkout")').click()
    cy.url().should('include','/checkout/')
  })

  it('TC-02: User membeli produk dengan tidak memasukkan kuantitas pesanan', () => {
    cy.contains('Mulai Belanja').click()
    cy.wait(2000);
    cy.get('button').eq(0).click()
    cy.get('button:contains("Checkout")').click()
    cy.url().should('not.include','/checkout/')
  })
})

describe('TS-04: User mengkases halaman checkout', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    Cypress.config("baseUrl","http://localhost:3000/")
    cy.visit('/checkout/656e0c412bdae0ba3854fc44?qty=1')
  });

  it('TC-01: User checkout produk yang telah dibeli', () => {
    cy.contains('Ubah alamat pengiriman').click()
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(1).select('KABUPATEN SUMEDANG')
    cy.wait(500)
    cy.get('select').eq(2).select('JATINANGOR')
    cy.wait(500)
    cy.get('select').eq(3).select('CIKERUH')
    cy.contains('Simpan Alamat').click()
    cy.contains('Puri Indah Jatinangor No.21, Provinsi JAWA BARAT, KABUPATEN SUMEDANG, Kec. JATINANGOR, Kel/Desa. CIKERUH')
  })

  it('TC-02: User checkouut produk yang telah dibeli namun tidak memasukkan alamat', () => {
    cy.contains('Ubah alamat pengiriman').click()
    cy.wait(500)
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(1).select('KABUPATEN SUMEDANG')
    cy.wait(500)
    cy.get('select').eq(2).select('JATINANGOR')
    cy.wait(500)
    cy.get('select').eq(3).select('CIKERUH')
    cy.get('button:contains("Simpan Alamat")').should('be.disabled')
  })

  it('TC-03: User checkout produk yang telah dibeli namun tidak memilih Provinsi', () => {
    cy.contains('Ubah alamat pengiriman').click()
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.wait(500)
    cy.get('select').eq(1).should('not.contain', 'KABUPATEN SUMEDANG')
  })

  it('TC-04: User checkout produk yang telah dibeli namun tidak memilih Kabupaten/kota', () => {
    cy.contains('Ubah alamat pengiriman').click()
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(2).should('not.contain','JATINANGOR')
  })

  it('TC-05: User checkout produk yang telah dibeli namun tidak memilih kecamatan', () => {
    cy.contains('Ubah alamat pengiriman').click()
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(1).select('KABUPATEN SUMEDANG')
    cy.wait(500)
    cy.get('select').eq(3).should('not.contain','CIKERUH')
  })
})
